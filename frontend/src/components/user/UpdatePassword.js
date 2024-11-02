import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updatePassword as updatePasswordAction,clearAuthError} from "../../actions/userActions";
import { toast } from "react-toastify";

export default function UpdatePassword() {

    const [password,setPassword] =  useState("");
    const [oldPassword,setOldPassword] =  useState("");
    const dispatch =  useDispatch();
    

    const {isUpdated,error} =  useSelector((state)=>state.authState)

    const submitHandler = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword',oldPassword)
        formData.append('password',password)
        dispatch(updatePasswordAction(formData))
    }

    useEffect(()=>{
        if (isUpdated) {
            toast('password updated successfully',{
                type:'success',
                position:toast.POSITION.BOTTOM_CENTER
            })
            setOldPassword("")
            setPassword("")
            return
        }
        if (error) {
            toast(error, {
               position: toast.POSITION.BOTTOM_CENTER,
               type:'error',
               onOpen:()=>{dispatch(clearAuthError)}
             })
             return
        }
    },[isUpdated,error,dispatch])
    return(
        <div className="wrapper">
        <div className="text-center name">
        Change Password      
          </div>
        <form onSubmit={submitHandler} className="p-3 mt-3">
        <label  class="ps-2 text-muted form-label" htmlFor="inputPassword1">Old Password</label>
        <div className="form-field d-flex align-items-center">
                <i className="fa fa-key"></i>
                <input
                 type="password"  
                 id="inputPassword1"
                placeholder="old password" 
                className="form-control "
                value={oldPassword}
                                onChange={e=>setOldPassword(e.target.value)}
                
                />
            </div>
            <label htmlFor="inputPassword2" class="ps-2 text-muted form-label">New Password</label>
            <div className="form-field d-flex align-items-center">
            
                <i className="fa fa-key"></i>
                <input
                 type="password" 
                 className="form-control"
                id="inputPassword2" 
                placeholder="new password"   
                value={password}
                                onChange={e=>setPassword(e.target.value)}
                
                />
            </div>
            
            <div className='form-field'>
             
              
          </div>
            <button  type="submit"  className="btn mt-3">Update Password</button>
        </form>
        
    </div>
    )
};
