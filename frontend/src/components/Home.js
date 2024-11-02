import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productsActions";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import Pagination  from "react-js-pagination";
import {toast} from 'react-toastify'
import OfferedProduct from "./product/OfferedProduct";
import NewProduct from "./product/NewProduct";
import SpecialProduct from "./product/SpecialProduct";


export default function Home() {
  const dispatch = useDispatch();
  const { products, offerProducts, latestProducts,specialProducts,loading,error ,productsCount,resPerPage} = useSelector((state) => state.productsState);
  const [currentPage,setCurrentPage] = useState(1)

  const setCurrentPageNo = (PageNo)=>{
    
    setCurrentPage(PageNo)
  }

  useEffect(() => {
    if (error) {
        return toast.error(error,{
            position: toast.POSITION.BOTTOM_CENTER
        })
    }
    dispatch(getProducts(null,null,null,null,currentPage));
  }, [error,dispatch,currentPage]);

  return (
    <Fragment>
        {loading? <Loader/> :<Fragment>
      <MetaData tittle={"Buy Best Products"} />
      

    

    {/*new product */}

      

    <div id = "collection" className= "pt-5 ">
        <div className= "container">
            <div className= "title text-center">
                <h2 className= "position-relative d-inline-block fw-bold">New Collection</h2>
            </div>
            <div className= "row g-0">
            <div className= "collection-list mt-4 row gx-0 gy-3">
            {latestProducts &&
              latestProducts.map((newProduct) => (
                <NewProduct key={newProduct._id} product={newProduct}/>
              ))}
          </div>
          </div>
          </div>
          
        </div>
      
      
      




{/*latest product */}
<div className="container pt-5">
        
        <div className= "title text-center">
                <h2 className= "position-relative d-inline-block fw-bold">Latest Products</h2>
            </div>
        <div className="clearfix"></div>
      </div>

      <div className="container my-5">
        <div className="row">
          <div className="card-group">
            
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product}/>
              ))}
          </div>
        </div>
      </div>
      

{/*Offer Products */}
      <section id = "popular" class = "pt-5">
        <div class = "container">
            <div class = "title text-center pt-3 pb-5">
                <h2 class = "position-relative d-inline-block ms-4 fw-bold">Offer Collection</h2>
            </div>

            <div class = "row">
            {offerProducts &&
              offerProducts.map((product) => (
                <OfferedProduct key={product._id} product={product}/>
              ))}
              </div>
              </div>
              </section>


      <section id = "special" class = "ptt-5">
        <div class = "container">
            <div class = "title text-center py-5">
                <h2 class = "position-relative d-inline-block fw-bold">Special Selection</h2>
            </div>

            <div class = "special-list row g-0">
            {specialProducts &&
              specialProducts.map((specialProduct) => (
                <SpecialProduct key={specialProduct._id} product={specialProduct}/>
              ))}
              </div>
              </div>
              </section>

     

      

                

      {/* productsCount>0 && productsCount> resPerPage ? <div className="d-flex justify-content-center mt-5">
                <Pagination
                   activePage={currentPage}
                   onChange={setCurrentPageNo}
                   totalItemsCount={productsCount}
                   itemsCountPerPage={resPerPage}
                   firstPageText={'first'}
                  lastPageText={'last'}
                  itemClass={'page-item'}
                  linkClass={'page-link'}
                  
                />
      </div>:null    */}
            </Fragment>}
            
    </Fragment>
  );
}
