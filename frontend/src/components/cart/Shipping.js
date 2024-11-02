import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {countries} from 'countries-list';
import { saveShippingInfo } from "../../slices/cartSlice";
import CheckOutStep from "./CheckOutStep";
import { toast } from "react-toastify";


export const validateShipping = (shippingInfo,navigate)=>{
    
    if (
        !shippingInfo.address||
        !shippingInfo.city||
        !shippingInfo.state||
        !shippingInfo.country||
        !shippingInfo.phoneNo||
        !shippingInfo.postalCode

        ) {
        toast.error('please fill the shipping information',{
            position:toast.POSITION.BOTTOM_CENTER
        })

        navigate('/shipping');
    }
}


export default function Shipping() {

        
    const {shippingInfo={}} = useSelector((state)=>state.cartState)
    

    const [address,setAddress]  = useState(shippingInfo.address);
    const [city,setCity]  = useState(shippingInfo.city);
    const [phoneNo,setPhoneNo]  = useState(shippingInfo.phoneNo);
    const [postalCode,setPostalCode]  = useState(shippingInfo.postalCode);
    const [country,setCountry]  = useState(shippingInfo.country);
    const [state,setState]  = useState(shippingInfo.state);

    const countryList =Object.values(countries);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(saveShippingInfo({address,city,phoneNo,postalCode,country,state}))
        navigate('/order/confirm')

    }


    return(
        <Fragment>
            <CheckOutStep shipping />
        
        <div className="wrapper">
        <div className="text-center name">
        Shipping Info
          </div>
        <form onSubmit={submitHandler} className="p-3 mt-3">
        <label  className="ps-2 text-muted form-label" htmlFor="inputPassword1">Address</label>
        <div className="form-field d-flex align-items-center">
                <input
                 type="text"  
                 id="inputPassword1"
                placeholder="" 
                className="form-control "
                value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                                required
                
                />
            </div>
            <label htmlFor="inputPassword2" class="ps-2 text-muted form-label">City</label>
            <div className="form-field d-flex align-items-center">
            
                <input
                 type="text" 
                 className="form-control"
                id="inputPassword2" 
                placeholder=""   
                value={city}
                                onChange={(e)=>setCity(e.target.value)}
                                required
                />
            </div>
            
            <label htmlFor="inputPassword3" class="ps-2 text-muted form-label">Phone No</label>
            <div className="form-field d-flex align-items-center">
            
                <input
                 type="number" 
                 className="form-control"
                id="inputPassword3" 
                placeholder=""   
                value={phoneNo}
                                onChange={(e)=>setPhoneNo(e.target.value)}
                                required
                />
            </div>
            <label htmlFor="inputPassword4" class="ps-2 text-muted form-label">postalCode</label>
            <div className="form-field d-flex align-items-center">
            
                <input
                 type="text" 
                 className="form-control"
                id="inputPassword4" 
                placeholder=""   
                value={postalCode}
                                onChange={(e)=>setPostalCode(e.target.value)}
                                required
                />
            </div>
            <label htmlFor="inputPassword5" class="ps-2 text-muted form-label">Country</label>
            <div className="form-field d-flex align-items-center">
            
            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e)=>setCountry(e.target.value)}
                                required
                            >{countryList.map((country,i)=>(
                                <option key={i} value={country.name}>
                                        {country.name}
                                    </option>
                            ))}

                            </select>
            </div>
            <label htmlFor="inputPassword6" class="ps-2 text-muted form-label">State</label>
            <div className="form-field d-flex align-items-center">
            
                <input
                 type="text" 
                 className="form-control"
                id="inputPassword6" 
                placeholder=""   
                value={state}
                                onChange={(e)=>setState(e.target.value)}
                                required
                />
            </div>
            <div className='form-field'>
             
              
          </div>
            <button  type="submit"  className="btn mt-3"> CONTINUE</button>
        </form>
        
    </div>
    </Fragment>
    )
};
