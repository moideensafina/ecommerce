import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { updateProfile ,clearAuthError,} from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";

export default function UpdateProfile() {


    const {error,user,isUpdated}  = useSelector((state)=> state.authState)
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [avatar,setAvatar] = useState("");
    const [avatarPreview,setAvatarPreview] = useState("/image/default_avatar.png");
    const dispatch =  useDispatch();
    
    const onChangeAvatar =(e)=>{
        const reader = new FileReader();
        reader.onload=()=>{
          if (reader.readyState === 2) {
            
            setAvatarPreview(reader.result);
            setAvatar(e.target.files[0])
          }
        
    }
    reader.readAsDataURL(e.target.files[0])
}

const submitHandler = (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('name',name)
    formData.append('email',email)        
    formData.append('avatar',avatar)
    dispatch(updateProfile(formData))
  }

  useEffect(()=>{
    if (user) {
        setName(user.name)
        setEmail(user.email)
        if (user.avatar) {
            setAvatarPreview(user.avatar)
        }
    }
    if (isUpdated) {
        toast('profile updated successfully',{
            type:'success',
            position:toast.POSITION.BOTTOM_CENTER,
            onOpen:()=> dispatch(clearUpdateProfile())
        })
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
  },[user,isUpdated,error,dispatch])

    return(
        <div className="wrapper">
        <div className="text-center name">
            Update Profile
        </div>
        <form onSubmit={submitHandler} className="p-3 mt-3">
        <div className="form-field d-flex align-items-center">
                <i className="fa fa-user"></i>
                <input
                 type="name"  
                placeholder="Name" 
                className="form-control"
                value={name}
                onChange={e=>setName(e.target.value)}
                />
            </div>
            <div className="form-field d-flex align-items-center">
                <i className="fa fa-envelope"></i>
                <input
                 type="email" 
                 className="form-control"
                id="userName" 
                placeholder="Email"   
                value={email}
                onChange={e=>setEmail(e.target.value)}
                
                />
            </div>
            
            <div className='form-field'>
             
              <div className='d-flex align-items-center'>
                  <div>
                      <figure className='avatar mr-3 item-rtl'>
                          <img
                              className='rounded-circle'
                              src={avatarPreview}
                              alt="avatar"
                          />
                      </figure>
                  </div>
                  <div className='custom-file'>
                      <input
                          type='file'
                          name='avatar'
                          className='custom-file-input'
                          id='customFile'
                          onChange={onChangeAvatar}
                      />
                  </div>
              </div>
          </div>
            <button  type="submit"  className="btn mt-3">Update</button>
        </form>
        
    </div>
    )
};
