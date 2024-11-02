import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector} from 'react-redux';
import { Link,  useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateOrder,orderDetail as orderDetailAction } from "../../actions/orderActions";
import { clearOrderUpdated ,clearError} from "../../slices/orderSlice";

export default function UpdateOrder () {
    
    const { loading, isOderUpdated, error, orderDetail } = useSelector(state => state.orderState)

    const {user ={},orderItems=[] , paymentInfo={}, totalPrice=0,shippingInfo={}} = orderDetail

    const isPaid = paymentInfo.status === 'succeeded'?true:false;
    const [ orderStatus , setOderStatus] = useState("Processing")
    const {id:orderId} = useParams()

    
    const dispatch = useDispatch();

    

    const submitHandler = (e) => {
        e.preventDefault();
        const orderData = {}

        orderData.orderStatus = orderStatus;
    
        dispatch(updateOrder(orderId, orderData))
    }

    

    
    useEffect(() => {
        if(isOderUpdated) {
            toast('order Updated Successfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderUpdated())
            })            
            return;
        }

        if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }

        dispatch(orderDetailAction(orderId))
    }, [isOderUpdated, error, dispatch,orderId])


    useEffect(() => {
        if(orderDetail._id) {
            setOderStatus(orderDetail.orderStatus);
        }
    },[orderDetail])


    return (
        <div className="row">
            <div className="col-12 col-md-2">
                    <Sidebar/>
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                <div className="row d-flex justify-content-around">
                            <div className="col-12 col-lg-8 mt-5 order-details">
        
                                <h1 className="my-5">Order {orderDetail._id}</h1>
        
                                <h4 className="mb-4">Shipping Info</h4>
                                <p><b>Name:</b> {user.name}</p>
                                <p><b>Phone:</b> {shippingInfo.phoneNo} </p>
                                <p className="mb-4"><b>Address:</b>{shippingInfo.address}, {shippingInfo.city},{shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
                                <p><b>Amount:</b> ${totalPrice}</p>
        
                                <hr />
        
                                <h4 className="my-4">Payment</h4>
                                <p className={isPaid?'greenColor':'redColor'} ><b>{isPaid?'PAID':'NOT PAID'}</b></p>
        
        
                                <h4 className="my-4">Order Status:</h4>
                                <p className={orderStatus&&orderStatus.includes('Delivered')?'greenColor':'redColor'} ><b>{orderStatus}</b></p>
        
        
                                <h4 className="my-4">Order Items:</h4>

                                <hr />
                                <div className="cart-item my-1">
                                    
                                                {orderItems && orderItems.map(item=>(
                                                    <div className="row my-5">
                                                    <div className="col-4 col-lg-2">
                                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                                    </div>
            
                                                    <div className="col-5 col-lg-5">
                                                        <Link to={`/product/${item.product}`} >{item.name}</Link>
                                                    </div>
                                                    
            
            
                                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                        <p>${item.price}</p>
                                                    </div>
            
                                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                        <p>{item.quantity} Piece(s)</p>
                                                    </div>
                                                </div>
                                                ))}
                                            
                                </div>
                                <hr />
                            </div>
                            <div className="col-12 col-lg-3 mt-5 ">
                                <h1 className="my-4">Order status</h1>
                                <div className="form-group">
                                    <select 
                                    className="form-control"
                                    onChange={e=>setOderStatus(e.target.value)}
                                    value={orderStatus}
                                    name='status'
                                    >
                                        <option className="Processing">Processing</option>
                                        <option className="Shipped">Shipped</option>
                                        <option className="Delivered">Delivered</option>
                                    </select>
                                    
                                </div>
                                <button 
                                    className="btn btn-primary mt-2 btn-block"
                                    disabled={loading}
                                    onClick={submitHandler}
                                    >
                                        Update Status
                                    </button>
                            </div>
                        </div>
                </Fragment>
            </div>
        </div>
        
    )
}