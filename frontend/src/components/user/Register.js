import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {register,clearAuthError} from '../../actions/userActions';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import './Login.css';

export default function Register() {
/*
    const [userData,setUserData] = useState({
        name:"",
        email:"",
        password:""
    });*/
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [avatar,setAvatar] = useState("");
    const [avatarPreview,setAvatarPreview] = useState("/images/default_avatar.png");

    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const {error,isAuthenticated} =  useSelector(state=> state.authState)

    const onChange = (e)=>{
      if (e.target.name=== 'avatar') {
        const reader = new FileReader();
        reader.onload=()=>{
          if (reader.readyState === 2) {
            
            setAvatarPreview(reader.result);
            setAvatar(e.target.files[0])
          }
        }
        reader.readAsDataURL(e.target.files[0])
       }
       /*else{
        setUserData({...userData,[e.target.name]:e.target.value})
        }*/
    }

const submitHandler = (e)=>{
  e.preventDefault();
  const formData = new FormData();
  formData.append('name',name)
  formData.append('email',email)
  formData.append('password',password)
  formData.append('avatar',avatar)
  dispatch(register(formData))
}

useEffect(()=>{
  if (isAuthenticated) {
    navigate("/");
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
},[error,isAuthenticated,dispatch,navigate])

    return(
        
        <div className="wrapper">
        <div className="text-center name">
            Register
        </div>
        <form onSubmit={submitHandler}  className="p-3 mt-3">
        <div className="form-field d-flex align-items-center">
                <i className="fa fa-user"></i>
                <input
                 type="name"  
                placeholder="Name" 
                className="form-control"
                onChange={e=> setName(e.target.value)}
                />
            </div>
            <div className="form-field d-flex align-items-center">
                <i className="fa fa-envelope"></i>
                <input
                 type="email" 
                 className="form-control"
                id="userName" 
                placeholder="Email"   
                onChange={e=> setEmail(e.target.value)}
                
                />
            </div>
            <div className="form-field d-flex align-items-center">
                <i className="fa fa-key"></i>
                <input type="password"
                 
                id="pwd" 
                placeholder="Password"
                className="form-control"
                onChange={e=> setPassword(e.target.value)}
                />
            </div>
            <div className='form-field'>
             {/*  <label htmlhtmlFor='avatar_upload'>Avatar</label>*/}
              <div className='d-flex align-items-center'>
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              className='rounded-circle'
                              alt='avatar'
                              
                              src={avatarPreview}
                          />
                      </figure>
                  </div>
                  <div className='custom-file'>
                      <input
                          type='file'
                          name='avatar'
                          className='custom-file-input'
                          id='customFile'
                          onChange={onChange}
                      />
                     {/* <label className='custom-file-label' htmlhtmlFor='customFile'>
                          Choose Avatar
                      </label> */}
                  </div>
              </div>
          </div>
            <button  type="submit"  className="btn mt-3">Register</button>
        </form>
        <div className="text-center fs-4">
            <a href="for;">Forget password?</a> <span className='fs-5'>or</span>  <a href="for;">Sign up</a>
        </div>
    </div>
    
    )
};
