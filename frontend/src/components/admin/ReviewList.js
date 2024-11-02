import { Fragment, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector} from  'react-redux'

import Loader from '../layouts/Loader';
import {MDBDataTable} from 'mdbreact';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';

import { deleteReviews, getReviews } from '../../actions/productsActions';
import { clearError, clearReviewDeleted } from '../../slices/productSlice';




export default function ReviewList() {

    const dispatch= useDispatch()
    
    const {reviews =[],loading=true , error,isReviewDeleted} = useSelector(state=>state.productState)

    const [productId , setProductId] = useState("");

    const setReviews = () =>{
        const data={
            columns:[
                {
                    label:'ID',
                    field:'id',
                    sort:'asc'
                },
                {
                    label:'Rating',
                    field:'rating',
                    sort:'asc'
                },
                {
                    label:'User',
                    field:'user',
                    sort:'asc'
                },
                {
                    label:'Comment',
                    field:'comment',
                    sort:'asc'
                },
                {
                    label:'Actions',
                    field:'actions',
                    sort:'asc'
                }
            ],
            rows:[]
        }

        reviews.forEach(review => {
            data.rows.push({
                id:review._id,
                rating:review.rating,
                user: review.user.name,
                comment:review.comment,
                actions:(
                    <Fragment>
                        <Button
                        onClick={e=>deleteHandler(e,review._id)}
                        className='btn btn-danger py-1 px-2 me-2'>
                            <i className='fa fa-trash'></i>
                        </Button>
                    </Fragment>
                )
            })
        });
        return data;
    }

    const deleteHandler=(e,id)=>{
        e.target.disabled =true;
        dispatch(deleteReviews(productId,id))
    }


    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(getReviews(productId))
    }

    useEffect(()=>{
        if (isReviewDeleted) {
            toast('Review deleted successfully',{
                type:'success',
                position:toast.POSITION.BOTTOM_CENTER,
                onOpen:()=> dispatch(clearReviewDeleted())
            })
            dispatch(getReviews(productId))
            return;
        }
        if (error ) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type:'error',
                onOpen:()=>{dispatch(clearError())}
              })
              return
        }
        
    },[dispatch,error,isReviewDeleted,productId])
    
    return(
        <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar />
        </div>
        <div className="col-12 col-md-10">
            <h1 className="my-4">Review List</h1>
            <div className='row justify-content-center mt-5'>
                <div className='col-5'>
                    <form onSubmit={submitHandler}>
                        <div className='form-group'>
                            <label>Product Id</label>
                            <input
                            type='text'
                            onChange={e=>setProductId(e.target.value)}
                            className='form-control'
                            />
                        </div>
                        <button type='submit' disabled={loading} className='btn btn-primary '>
                            Search
                        </button>
                    </form>
                </div>
            </div>
          <Fragment>
            {
            loading?
            <Loader /> :
                <MDBDataTable 
                data={setReviews()}
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
