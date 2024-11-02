import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword,clearAuthError } from "../../actions/userActions";
import {toast } from  'react-toastify';



export default function ResetPassword() {
    


    const {isAuthenticated,error} = useSelector((state)=>state.authState)
    const navigate = useNavigate();
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

    const dispatch = useDispatch();
    const  { token}= useParams();
    const  submitHandler =(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('password',password);
        formData.append('confirmPassword',confirmPassword);
        dispatch(resetPassword(formData,token))
    }

    useEffect(()=>{
        if (isAuthenticated) {
                toast('password reset success',{
                    type:'success',
                    position:toast.POSITION.BOTTOM_CENTER
                })
            navigate('/')
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
    },[isAuthenticated,error,dispatch,navigate])
    
    
    return(    
    <div className="wrapper">
    <div className="text-center name">
    Reset Password      
      </div>
    <form onSubmit={submitHandler} className="p-3 mt-3">
    <label  class="ps-2 text-muted form-label" htmlFor="inputPassword1"> Password</label>
    <div className="form-field d-flex align-items-center">
            <i className="fa fa-key"></i>
            <input
             type="password"  
             id="inputPassword1"
            placeholder="old password" 
            className="form-control "
            value={password}
                            onChange={(e)=>setPassword(e.target.value)}

            
            />
        </div>
        <label htmlFor="inputPassword2" class="ps-2 text-muted form-label">Confirm Password</label>
        <div className="form-field d-flex align-items-center">
        
            <i className="fa fa-key"></i>
            <input
             type="password" 
             className="form-control"
            id="inputPassword2" 
            placeholder="new password"   
            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
            
            />
        </div>
        
        <div className='form-field'>
         
          
      </div>
        <button  type="submit"  className="btn mt-3">Set Password</button>
    </form>
    
</div>
)
};
