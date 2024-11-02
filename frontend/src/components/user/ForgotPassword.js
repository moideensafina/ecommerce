import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword , clearAuthError } from "../../actions/userActions";
import {toast } from 'react-toastify';


export default function ForgotPassword() {




    const [email,setEmail ] =  useState("");
    const dispatch = useDispatch()
    const {error,message} = useSelector((state)=>state.authState)


    const submitHandler = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('email',email);
        dispatch(forgotPassword(formData))
    }

    useEffect(()=>{
        if (message) {
            toast(message,{
                type:'success',
                position:toast.POSITION.BOTTOM_CENTER
            })
            setEmail("");
            return;
        }
        if (error) {
            toast(error, {
               position: toast.POSITION.BOTTOM_CENTER,
               type:'error',
               onOpen:()=>{dispatch(clearAuthError)}
             })
             return
        }
    },[message,error,dispatch])


    return(
        <div className="wrapper">
        <div className="text-center name">
        Forgot Password      
          </div>
        <form onSubmit={submitHandler}  className="p-3 mt-3">
        <label  class="ps-2 text-muted form-label" htmlFor="inputPassword1">
            Enter Email</label>
        <div className="form-field d-flex align-items-center">
                <i className="fa fa-key"></i>
                <input
                 type="email"  
                 id="inputPassword1"
                placeholder="" 
                className="form-control "
                value={email}
                                onChange={e=>setEmail(e.target.value)}
                
                />
            </div>
            
            <div className='form-field'>
             
              
          </div>
            <button  type="submit"  className="btn mt-3">Update Password</button>
        </form>
        
    </div>
    )
};
