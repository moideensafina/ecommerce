import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from ".././layouts/MetaData";
import { getProducts } from "../../actions/productsActions";
import Loader from ".././layouts/Loader";
import Product from ".././product/Product";
import Pagination  from "react-js-pagination";
import {toast} from 'react-toastify'
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css'


export default function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading,error ,productsCount,resPerPage} = useSelector((state) => state.productsState);
  const [currentPage,setCurrentPage] = useState(1)
  const [price,setPrice] = useState([1,1000])
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);



  const {keyword} = useParams();
  const categories = [
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
  ];

  const setCurrentPageNo = (PageNo)=>{
    
    setCurrentPage(PageNo)
  }

  useEffect(() => {
    if (error) {
        return toast.error(error,{
            position: toast.POSITION.BOTTOM_CENTER
        })
    }
    dispatch(getProducts(keyword,priceChanged,category,rating,currentPage));
  }, [error,dispatch,currentPage,keyword,priceChanged,category,rating]);


//offset bootstrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
        {loading? <Loader/> :<Fragment>
      <MetaData tittle={"Buy Best Products"} />
      <Navbar className="">
        <Container>
          <Navbar.Brand >  
            <Button variant="danger" onClick={handleShow}>
            <i class="fa fa-filter"></i>Filter
            </Button>
            </Navbar.Brand>
        </Container>
      </Navbar>


      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fs-4 fw-bold"><i class="fa fa-filter"></i> <span>Filter</span> </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/*   	Price  Filter  */}
          <div className="px-5" onMouseUp={() => {
            setPriceChanged(price) 
            handleClose()
          }}>
          <Slider 
            	range={true}
                marks={
                    {
                        1:"$1",
                        1000:"$1000"
                    }
                }
                min={1}
                max={1000}
                defaultValue={price}
                onChange={(price) => {
                    setPrice(price)
                    
                  }}

                handleRender={
                    renderProps=>{
                        return(
                            <Tooltip overlay={`$${renderProps.props['aria-valuenow']}`}>
                                <div {...renderProps.props}>    </div>
                                 </Tooltip>
                        )
                    }
                }
          />
          </div>
          <hr className="my-5"/>
          {/*   Category    Filter */}
          <div className="mt-1">
                  <h3 className="mb-3">categories</h3>
                  <ul className="pl-0">
                    {categories.map(category =>
                      <li
                         className="fw-medium"
                        style={{
                          cursor: "pointer",
                          listStyleType: "none"
                        }}
                        key={category}
                        onClick={() => {
                          setCategory(category)
                            handleClose()
                        }}
                      >
                        {category}
                      </li>
                    )}

                  </ul>
                </div>
{/*rating filter */}
<div className="mt-3">
                  <h4 className="mb-3">ratings</h4>
                  <ul className="pl-0">
                    {[5,4,3,2,1].map(star =>
                      <li
                        style={{
                          cursor: "pointer",
                          listStyleType: "none"
                        }}
                        key={star}
                        onClick={() => {
                          setRating(star)
                          handleClose()
                        }}
                      >
                        <div className="rating-outer">
                          <div className="rating-inner"
                          style={{
                            width:`${star*20}%`
                          }}>

                          </div>
                        </div>
                      </li>
                    )}

                  </ul>
                </div>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="container my-5">
        <div className="float-start">
          <h4>Latest Products</h4>
          
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
      {productsCount>0 && productsCount> resPerPage ? <div className="d-flex justify-content-center mt-5">
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
      </div>:null}
      
            </Fragment>}
            
    </Fragment>
  );
}
