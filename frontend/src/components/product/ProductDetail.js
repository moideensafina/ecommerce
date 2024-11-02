import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, getProduct } from "../../actions/productsActions";
import { useParams } from "react-router-dom";
import Loader from "../layouts/Loader";
import { Carousel } from "react-bootstrap";
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import {Modal} from 'react-bootstrap'
import {clearError, clearProduct, clearReviewSubmitted} from '../../slices/productSlice'
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";


export default function ProductDetail() {
  const { loading, product={},isReviewSubmitted,error } = useSelector((state) => state.productState);
  const {user} = useSelector(state=>state.authState);

  const dispatch = useDispatch();
  
  const { id } = useParams();

  const [quantity,setQuantity] = useState(1);


const increaseQty=()=>{
    const count = document.querySelector('.count');
    if (product.stock ===0 || count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1 ;
    setQuantity(qty)
}

const decreaseQty=()=>{
    const count = document.querySelector('.count');
    if (count.valueAsNumber ===1) return;

    const qty = count.valueAsNumber - 1 ;
    setQuantity(qty)
}


const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rating,setRating] = useState(1);
    const [comment ,setComment] =useState("")


    const reviewHandler= ()=>{
      const formData = new FormData();
      formData.append('rating',rating)
      formData.append('comment',comment)
      formData.append('productId',id)
      dispatch(createReview(formData))
  }

  useEffect(()=>{

    if (isReviewSubmitted) {
        handleClose()
        toast('Review submitted successfully',{
            type:'success',
            position:toast.POSITION.BOTTOM_CENTER,
            onOpen:()=> dispatch(clearReviewSubmitted())
        })

    }

    if (error) {
        toast(error, {
            position: toast.POSITION.BOTTOM_CENTER,
            type:'error',
            onOpen:()=>{dispatch(clearError())}
          })
          return
    }
    if (!product._id || isReviewSubmitted) {
      
        dispatch(getProduct(id))
    }
    return()=>{

        dispatch(clearProduct())
    }
     
   },[dispatch,id,isReviewSubmitted,error])


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData tittle={product.name} />
          <div className="card blogs">
            <div className="row">
              <div className="col-md-5 p-5">
                <Carousel pause="hover">
                  {product.images &&
                    product.images.map((image) => (
                      <Carousel.Item key={image._id}>
                        <img
                          className="card-img h-90 d-block w-100"
                          src={image.image}
                          alt={product.name}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <h5 className="card-title fs-3">{product.name}</h5>
                  <p className="fs-6 text-muted">Product #{product._id}</p>
                  <p className="fs-3 fw-bold">$ {product.price}</p>
                  <p className="card-text">{product.description}</p>
                  <hr />
                  <div class="rating-outer">
                    <div
                      class="rating-inner"
                      style={{ width: `${(product.ratings / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span id="no_of_reviews">
                    ({product.numOfReviews} Reviews)
                  </span>
                  <p>
                    Status:{" "}
                    <span
                      id="stock_status"
                      className={product.stock > 0 ? "greenColor" : "redColor"}
                    >
                      {product.stock > 0 ? "In stock" : "Out of stock"}
                    </span>
                  </p>
                  <p id="product_seller mb-2">
                    Sold by: <strong>{product.seller}</strong>
                  </p>
                  <hr />
                  <div class="stockCounter d-inline">
                    <span class="btn btn-danger minus" onClick={decreaseQty}>-</span>

                    <input
                      type="number"
                      class="form-control count d-inline"
                      value={quantity}
                      readOnly

                    />

                    <span class="btn btn-primary plus" onClick={increaseQty}>+</span>
                  </div>
                  <button
                    type="button"
                    id="cart_btn"
                    class="btn btn-secondary d-inline ms-4"
                    disabled={product.stock===0?true:false} 
                    onClick={()=>{dispatch(addCartItem(product._id,quantity))
                      toast('Cart Item Added!',{
                        type:'success',
                        position:toast.POSITION.BOTTOM_CENTER
                       })
                      }}
                  >
                    Add to Cart
                  </button>

                  <div className="mb-5">
                    <p className="card-text float-end">
                      
                    </p>
                  </div>
                  {user?
                  
                  <div className="d-grid ">
                    <button onClick={handleShow} className="btn btn-success">Submit Review</button>
                  </div>:
                  <div className="alert alert-danger mt-2"> Login to Post Review </div>
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-2 mb-5">
                    <div className="rating w-50">
                       
                        <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Submit Review</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                        <ul className="stars" >
                                            {
                                                [1,2,3,4,5].map(star=>(
                                                    <li 
                                                    
                                                    value={star}
                                                    onClick={()=>setRating(star)}
                                                    className={`star ${star<=rating?'orange':''}`}
                                                    onMouseOver={(e)=>e.target.classList.add('yellow')}
                                                    onMouseOut={(e)=>e.target.classList.remove('yellow')}

                                                    >
                                                        <i className="fa fa-star"></i></li>

                                                ))
                                            }
                                            
                                        </ul>

                                        <textarea  onChange={(e)=>setComment(e.target.value)} name="review" id="review" className="form-control mt-3">

                                        </textarea>
                                            <button disabled={loading} onClick={reviewHandler} aria-label="Close"  className="btn my-3 float-end  px-4 btn-danger">
                                            submit
                                            </button>
                                </Modal.Body>
                               
                            </Modal>
                    </div>
						
            </div>

        {product.reviews && product.reviews.length >0 ?
        <ProductReview reviews={product.reviews} />:
          null
        }
        </Fragment>
        
      )}
    </Fragment>
  );
}
