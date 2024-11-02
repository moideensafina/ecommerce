import { Fragment, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector} from  'react-redux'
import { Link } from 'react-router-dom';
import { deleteProduct, getAdminProducts } from '../../actions/productsActions';
import { clearError, clearProductDeleted } from '../../slices/productSlice';
import Loader from '../layouts/Loader';
import {MDBDataTable} from 'mdbreact';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';



export default function ProductList() {

    const dispatch= useDispatch()
    
    const {products =[],loading=true , error} = useSelector(state=>state.productsState)
    const {isProductDeleted,error:productError} = useSelector(state=>state.productState)

    const setProducts = () =>{
        const data={
            columns:[
                {
                    label:'ID',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Name',
                    field:'name',
                    sort:'asc'
                },
                {
                    label:'Price',
                    field:'price',
                    sort:'asc'
                },
                {
                    label:'Stock',
                    field:'stock',
                    sort:'asc'
                },
                {
                    label:'Action',
                    field:'action',
                    sort:'asc'
                }
            ],
            rows:[]
        }

        products.forEach(product => {
            data.rows.push({
                id:product._id,
                name:product.name,
                price: `$${product.price}`,
                stock:product.stock,
                action:(
                    <Fragment>
                        
                        <Link to={`/admin/product/${product._id}`} className="btn btn-primary m-2"><i className='fa fa-pencil'></i> </Link>
                        <Button
                        onClick={e=> deleteHandler(e,product._id)}
                        className='btn btn-danger m-2'>
                            <i  className='fa fa-trash'></i>
                        </Button>
                        
                    </Fragment>
                )
            })
        });
        return data;
    }

    const deleteHandler=(e,id)=>{
        e.target.disabled =true;
        dispatch(deleteProduct(id))
    }

    useEffect(()=>{
        if (isProductDeleted) {
            toast('Product deleted successfully',{
                type:'success',
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen:()=> dispatch(clearProductDeleted())
            })
            return;
        }
        if (error || productError) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type:'error',
                onOpen:()=>{dispatch(clearError())}
              })
              return
        }
        dispatch(getAdminProducts)
    },[dispatch,error,isProductDeleted,productError])
    
    return(
        <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar />
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">Product List</h1>
          <Fragment>
            {
            loading?
            <Loader /> :
                <MDBDataTable 
                data={setProducts()}
                bordered
                striped
                hover
                className='px-3'   
                scrollX             
                />
            
        }
          </Fragment>
        </div>
    </div>
    )
};
