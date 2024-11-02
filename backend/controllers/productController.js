const catchAsyncError = require("../middlewares/catchAsyncError");
const Product = require("../models/productModels");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 6;
  let buildQuery = () => {
    return new ApiFeatures(Product.find(), req.query).search().filter();
  };

  const filteredProductsCount = await buildQuery().query.countDocuments({});

  const totalProductsCount = await Product.countDocuments({});
  let productsCount = totalProductsCount;

  if (filteredProductsCount !== totalProductsCount) {
    productsCount = filteredProductsCount;
  }


  const products = await buildQuery().paginate(resPerPage).query;
 // await new Promise(resolve => setTimeout(resolve,2000))
  //return next(new ErrorHandler('error message',400))




  let buildQuery2 =()=>{
    return new ApiFeatures(Product.find({
      $or: [
        {
          offer: { $regex: "yes", $options: "i" }
        },
      ],
    }),req.query)
}
  let resPerPageOffer = 12;
const offeredProducts = await buildQuery2().paginate(resPerPageOffer).query;





  let buildQuery3 =()=>{
    return new ApiFeatures(Product.find({
      $or: [
        {
          latest: { $regex: "yes", $options: "i" }
        },
      ],
    }),req.query)
}
  let resPerPageLatest = 8;
const latestProducts = await buildQuery3().paginate(resPerPageLatest).query;
  

let buildQuery4 =()=>{
  return new ApiFeatures(Product.find({
    $or: [
      {
        special: { $regex: "yes", $options: "i" }
      },
    ],
  }),req.query)
}
let resPerPageSpecial = 8;
const specialProducts = await buildQuery4().paginate(resPerPageSpecial).query;
 
  res.status(200).json({
    success: true,
    count: productsCount,
    resPerPage,
    products,
    offeredProducts,
        latestProducts,
        specialProducts
  });
});

exports.newProduct = catchAsyncError(async (req, res, next) => {
  let images = [];
  let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV ==="production") {
      BASE_URL = `${req.protocol}://${req.get('host')}`
    }

  if (req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/product/${file.originalname}`;
      images.push({ image: url });
    });
  }

  req.body.images = images;

  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  });
});

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate(
    "reviews.user",
    "name email"
  );

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  //  await new Promise(resolve => setTimeout(resolve,2000))
  res.status(201).json({
    success: true,
    product,
  });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  //uploading images
  let images = [];

  //if images not cleared we keep existing images
  if (req.body.imagesCleared === "false") {
    images = product.images;
  }

  let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV ==="production") {
      BASE_URL = `${req.protocol}://${req.get('host')}`
    }


  if (req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/product/${file.originalname}`;
      images.push({ image: url });
    });
  }

  req.body.images = images;

  if (!product) {
    res.status(404).json({
      success: true,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({
      success: true,
      message: "Product not found",
    });
  }
  await product.deleteOne();

  res.status(201).json({
    success: true,
    message: "product deleted",
  });
});

exports.createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;

  const review = {
    user: req.user.id,
    rating,
    comment,
  };

  const product = await Product.findById(productId);
  //finding user review exists
  const isReviewed = product.reviews.find((review) => {
    return review.user.toString() == req.user.id.toString();
  });

  if (isReviewed) {
    //updating the  review
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    //creating the review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  //find the average of the product reviews
  product.ratings =
    product.reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / product.reviews.length;
  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// get review
exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate(
    "reviews.user",
    "name email"
  );

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//delete review
exports.deleteReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  // filtering reviews which does not match the deleting review id
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });

  //number of review
  const numOfReviews = reviews.length;

  //finding the average with filtering reviews
  let ratings =
    reviews.reduce((acc, review) => {
      return review.rating + acc;
    }, 0) / reviews.length;
  ratings = isNaN(ratings) ? 0 : ratings;

  //save product document
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings,
  });
  res.status(200).json({
    success: true,
  });
});

// get Admin products   - api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).send({
    success: true,
    products,
  });
});
