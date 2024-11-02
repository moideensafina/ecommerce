
import { Link } from "react-router-dom";

export default function Product({ product }) {

  return (
    <div className="col-12 col-md-4 px-4">
                  <div className="card mb-4 ">
                    <img
                      src={product.images[0].image}
                      alt="HTML5 Tamil"
                      className="card-img-top product-img img-fluid"
                      
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link className="text-dark link-offset-2 fw-bold fs-5 link-underline link-underline-opacity-0" to={`/product/${product._id}`}>{product.name} </Link>
                      </h5>
                      <div className="ratings mt-auto">
                        <div className="rating-outer">
                          <div className="rating-inner" style={{width:`${product.ratings / 5*100}%`}}></div>
                        </div>
                        <span id="no_of_reviews" className="text-muted fs-6 px-2">
                          ({product.numOfReviews} Reviews)
                        </span>
                      </div>
                      <h5 className="card-text">${product.price} </h5>
                      <div className="ratings mt-auto"></div>
                      <div className="d-grid">
                        <Link to={`/product/${product._id}`}  className="btn btn-primary ">
                          <i
                            className="fa fa-external-link pe-3"
                            aria-hidden="true"
                          ></i>
                          View Details
                        </Link>
                      </div>
                    </div>
                    <div className="card-footer text-center"></div>
                  </div>
                </div> 
  );
}