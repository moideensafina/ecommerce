import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from "../../slices/cartSlice";

export default function Cart() {

  const {items} = useSelector((state)=>state.cartState)
    
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const increaseQty = (item) => {
      const count = item.quantity;
      if(item.stock ===0 ||  count >= item.stock) return;
      dispatch(increaseCartItemQty(item.product))
  }
  const decreaseQty = (item) => {
      const count = item.quantity;
      if(count === 1) return;
      dispatch(decreaseCartItemQty(item.product))
  }
  
  const checkoutHandler = ()=>{
      navigate('/login?redirect=shipping')
  }



    return(
        <section className="h-100 gradient-custom">
  <div className="container py-5">
    <div className="row d-flex justify-content-center my-4">
      <div className="col-md-8">
        <div className="card mb-4">
        {
            items.length===0?
            <div className="card-header py-3">
            <h5 className="mb-0">Your Cart is Empty</h5>
          </div>
            :
          <Fragment>
          <div className="card-header py-3">
            <h5 className="mb-0">Cart - {items.length} items</h5>
          </div> </Fragment>}

          <div className="card-body">

              {items.map(item=>(
                <Fragment>
                              <div className="row">
              <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
            
                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                  <img src={item.image} alt={item.name}
                    className="w-100"  />
                  <a href="#!">
                    <div className="mask" style={{backgroundColor:"rgba(251, 251, 251, 0.2)"}}></div>
                  </a>
                </div>
            
              </div>

              <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
            
                <p><strong> <Link to={`/product/${item.product}`} >{item.name}</Link> </strong></p>
                <p>Color: blue</p>
                <p>Size: M</p>

                <button type="button" onClick={()=> dispatch(removeItemFromCart(item.product))} className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                  title="Remove item">
                  <i className="fa fa-trash "></i>
                </button>


                <button type="button" className="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                  title="Move to the wish list">
                  <i className="fa fa-heart"></i>
                </button>
            
              </div>

              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            
                <div className="d-flex mb-4" style={{maxWidth:"300px"}} >
                <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={() => decreaseQty(item)} >-</span>
                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

								<span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                            </div>
                </div>
            

            
                <p className="text-start text-md-center">
                  <strong>${item.price}</strong>
                </p>
            
              </div>
            </div>
            
<hr className="my-4" />
                </Fragment>
              ))}



            
            
            
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <p><strong>Expected shipping delivery</strong></p>
            <p className="mb-0">12.10.2020 - 14.10.2020</p>
          </div>
        </div>
        <div className="card mb-4 mb-lg-0">
          <div className="card-body">
            <p><strong>We accept</strong></p>
            <img className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
              alt="Visa" />
            <img className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
              alt="American Express" />
            <img className="me-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
              alt="Mastercard" />
            
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0">Summary</h5>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Subtotal :
                <span>{items.reduce((acc,item)=>(acc+item.quantity),0)} (Units)</span>
              </li>
              
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3 mt-4">
                <div>
                  <strong>Total amount :</strong>
                  
                </div>
                <span><strong>${items.reduce((acc,item)=>(acc+item.quantity*item.price),0)}</strong></span>
              </li>
            </ul>

            <button onClick={checkoutHandler} type="button" className="btn btn-primary  btn-block">
              Go to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    )
};
