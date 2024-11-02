import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productsActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function NewProduct() {
    
    const [ name,setName] = useState("");
    const [ price,setPrice] = useState("");
    const [ description,setDescription] = useState("");
    const [ category,setCategory] = useState("");
    const [ stock,setStock] = useState(0);
    const [ seller,setSeller] = useState("");
    const [ images,setImages] = useState([]);
    const [ imagesPreview,setImagesPreview] = useState([]);
    const [ offerProduct,setOfferProduct] = useState("");
    const [ latestProduct,setLatestProduct] = useState("");
    const [ specialProduct,setSpecialProduct] = useState("");
    

    const {loading,isProductCreated,error} = useSelector(state=>state.productState)

    const categories =[
                'Electronics',
                'Headphones',
                'Food',
                'Laptops',
                'Sports',
                'Books',
                'Mobile Phones',
                'Outdoor',
                'Accessories',
                'Outdoor'
    ]

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onImagesChange =(e)=>{
        const files = Array.from(e.target.files);
        files.forEach(file=>{
            const reader = new FileReader()

            reader.onload= ()=>{
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray =>[...oldArray,reader.result])
                    setImages(oldArray=>[...oldArray,file])
                }
            }

            reader.readAsDataURL(file)
        })

    }

    const submitHandler = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',name);
        formData.append('price',price);
        formData.append('stock',stock);
        formData.append('description',description);
        formData.append('seller',seller);
        formData.append('category',category);
        formData.append('latest',latestProduct);
        formData.append('offer',offerProduct);
        formData.append('special',specialProduct);
        images.forEach(image=>{
            formData.append('images',image)
        })
        dispatch(createNewProduct(formData))
    }

    useEffect(()=>{
        if (isProductCreated) {
            toast('Product created successfully',{
                type:'success',
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen:()=> dispatch(clearProductCreated())
            })
            navigate('/admin/products')
            return;
        }
        if (error) {
            toast(error, {
               position: toast.POSITION.BOTTOM_CENTER,
               type:'error',
               onOpen:()=>{dispatch(clearError())}
             })
             return
        }
    },[isProductCreated,error,dispatch,navigate])

    return(
        <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar/>
            
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
          <div className="wrapper my-5"> 
        <form onSubmit={submitHandler} className="" encType='multipart/form-data'>
            <h1 className="mb-4">New Product</h1>

            <div className="form-group  my-3">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                onChange={e=>setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="form-group my-3">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  onChange={e=>setPrice(e.target.value)}
                value={price}
                />
              </div>

              <div className="form-group my-3">
                <label htmlFor="description_field">Description</label>
                <textarea className="form-control" id="description_field" rows="8" 
                 onChange={e=>setDescription(e.target.value)}
                 value={description}
                ></textarea>
              </div>

              <div className="form-group my-3">
                <label htmlFor="category_field">Category</label>
                <select onChange={e=>setCategory(e.target.value)} className="form-control" id="category_field">
                    <option value={""}>select</option>
                    {categories.map(category=>(
                        <option key={category} value={category}>{category} </option>
                    ))}
                    
                  </select>
              </div>

              <div className="form-group my-3">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  onChange={e=>setStock(e.target.value)}
                value={stock}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="category_field">New Product</label>
                <select onChange={e=>setLatestProduct(e.target.value)} className="form-control" id="category_field">
                    <option value={""}>select</option>
                    
                        <option key={"yes"} value={"yes"}>Yes </option>
                        <option key={"no"} value={"no"}>No </option>                    
                  </select>
              </div>
              <div className="form-group my-3">
                <label htmlFor="category_field">Offer Product</label>
                <select onChange={e=>setOfferProduct(e.target.value)} className="form-control" id="category_field">
                    <option value={""}>select</option>
                    
                        <option key={"yes"} value={"yes"}>Yes </option>
                        <option key={"no"} value={"no"}>No </option>                    
                  </select>
              </div>
              <div className="form-group my-3">
                <label htmlFor="category_field">Special Product</label>
                <select onChange={e=>setSpecialProduct(e.target.value)} className="form-control" id="category_field">
                    <option value={""}>select</option>
                    
                        <option key={"yes"} value={"yes"}>Yes </option>
                        <option key={"no"} value={"no"}>No </option>                    
                  </select>
              </div>

              <div className="form-group my-3">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  onChange={e=>setSeller(e.target.value)}
                value={seller}
                />
              </div>
              
              <div className='form-group my-3'>
                <label>Images</label>
                
                    <div className='custom-file'>
                        <input
                            type='file'
                            name='product_images'
                            className='custom-file-input'
                            id='customFile'
                            multiple
                            onChange={onImagesChange}
                        />

                        <label className='custom-file-label' htmlFor='customFile'>
                            Choose Images
                        </label>
                    </div>
                    {imagesPreview.map(image=>(
                        <img 
                        className="mt-3 mr-2"
                        key={image}
                        src={image}
                        alt={image}
                        width="55px"
                        height="52px"
                        />
                    ))}
            </div>

  
            <button
              id="login_button"
              type="submit"
              disabled={loading}
              className="btn "
            >
              CREATE
            </button>

          </form>
         </div>
          </Fragment>
        </div>
    </div>

       
    )
};
