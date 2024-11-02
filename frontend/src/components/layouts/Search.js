import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useLocation, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';

export default function Search() {
    /*<div className="input-group">
            <input
              type="text"
              id="search_field"
              className="form-control"
              placeholder="Enter Product Name ..."
            />
            <div className="input-group-append">
              <button id="search_btn" className="btn btn-success">
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
           */
          const    navigate = useNavigate();
        const location =  useLocation();

        const [keyword,setKeyword]=  useState("");
          const searchHandler= (e)=>{
            e.preventDefault();
            navigate(`/search/${keyword}`)
        }
        const clearKeyword=()=>{
            setKeyword("");
        }
    
        useEffect(()=>{
            if (location.pathname=== '/') {
                clearKeyword()
            }
        },[location])
    return(
        <Form onSubmit={searchHandler} className="d-flex ps-5 ">
                  <Form.Control
                    type="search"
                    placeholder="Enter product name ..."
                    className="me-1"
                    aria-label="Search"
                    onChange={(e)=>{setKeyword(e.target.value)}}
                  />
                  <Button onClick={searchHandler} variant="outline-success">Search</Button>
                </Form>
    )
};
