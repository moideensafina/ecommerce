import { Link } from "react-router-dom"

export default function NewProduct({product}) {
    return (
      
      <>
      <div className= "col-md-6 col-lg-4 col-xl-3  p-2 singleProduct">
                        <div className= "collection-img position-relative">
                            <img src={product.images[0].image}
                             className= "w-100"/>
                            <span className= "position-absolute  text-white d-flex align-items-center justify-content-center">New</span>
                        </div>
                        <div className= "text-center py-2">
                        <div className="rating-outer">
                          <div className="rating-inner" style={{width:`${product.ratings / 5*100}%`}}></div>
                        </div>
                        <p>
                        <Link className="text-dark link-offset-2 fw-bold fs-5 link-underline link-underline-opacity-0" to={`/product/${product._id}`}>{product.name} </Link>
                        </p>
                            <span className= "fw-bold">$ {product.price}</span>
                        </div>
                    </div>
      
        
        </>
      );
};
