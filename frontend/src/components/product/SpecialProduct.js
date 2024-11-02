import { Link } from "react-router-dom"

export default function SpecialProduct({product}) {
    return (
        <div class = "col-md-6 col-lg-4 col-xl-3 p-2 ">
                    <div class = "special-img position-relative overflow-hidden">
                        <img 
                        src={product.images[0].image}
                        class = "w-100"/>
                        
                    </div>
                    <div class = "text-center py-2">
                    <p>
                        <Link className="text-dark link-offset-2 fw-bold fs-5 link-underline link-underline-opacity-0" to={`/product/${product._id}`}>{product.name} </Link>
                        </p>
                        <span class = "fw-bold d-block">$ {product.price}</span>
                    </div>
                </div>
    )}