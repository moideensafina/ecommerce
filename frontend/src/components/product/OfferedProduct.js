import { Link } from "react-router-dom";


export default function OfferedProduct({ product }) {
  return (
    <div class = "col-md-6 col-lg-4 row g-3">
                    <div class = "d-flex align-items-start justify-content-start">
                        <img 
                        src={product.images[0].image}
                         alt = {product.name} class = "img-fluid pe-3 h-97 w-25"/>
                        <div>
                        <p>
                        <Link className="text-dark link-offset-2 fw-bold fs-6 link-underline link-underline-opacity-0" to={`/product/${product._id}`}>{product.name} </Link>
                        </p>
                            <span className="text-dark fw-bold fs-5">$ {product.price}</span>
                        </div>
                    </div>
                    
                </div>

  );
}
