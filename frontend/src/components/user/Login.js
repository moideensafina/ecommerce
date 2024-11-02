import {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { clearAuthError, login } from '../../actions/userActions';
import MetaData from '../layouts/MetaData'
import './Login.css'
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
export default function Login() {

    const [email,setEmail] = useState("");
        const [password,setPassword] =useState("");
        const dispatch = useDispatch();
        const navigate =  useNavigate();
        const location = useLocation()

        const {error,isAuthenticated} = useSelector(state=>state.authState)


        const redirect = location.search?'/'+location.search.split('=')[1]:'/';

        const submitHandler = (e) =>{
            e.preventDefault();
            dispatch(login(email,password))
        }

            useEffect(()=>{
                if (isAuthenticated) {
                    navigate(redirect);
                }

                if (error) {
                     toast(error, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        type:'error',
                        onOpen:()=>{dispatch(clearAuthError)}
                      })
                      return
                }
            },[error,isAuthenticated,dispatch,navigate,redirect])

     return(
    <Fragment>
        <MetaData tittle={'Login'} />
        <div className="wrapper">
        <div className="logo">
            <img src="./images/login.jpg" alt=""/>
        </div>
        <div className="text-center mt-4 name">
            Welcome
        </div>
        <form onSubmit={submitHandler} className="p-3 mt-3">
            <div className="form-field d-flex align-items-center">
                <i className="fa fa-user"></i>
                <input type="email" 
                name="userName" 
                id="userName" 
                placeholder="Email" 
                value={email}
                onChange={e=> setEmail(e.target.value)}
                />
            </div>
            <div className="form-field d-flex align-items-center">
                <i className="fa fa-key"></i>
                <input type="password"
                 name="password" 
                id="pwd" 
                placeholder="Password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                />
            </div>
            <button  type='submit' className="btn mt-3">Login</button>
        </form>
        <div className="text-center fs-4">
            <Link to="/password/forgot">Forget password?</Link> <span className='fs-5'>or</span>  <a href="/register">New user</a>
        </div>
    </div>
    </Fragment>
    

    )
};
