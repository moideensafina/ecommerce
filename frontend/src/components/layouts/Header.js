import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Offcanvas from 'react-bootstrap/Offcanvas';
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  Dropdown, Image } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { logOut } from "../../actions/userActions";

import Container from 'react-bootstrap/Container';


export default function Header() {
  
  const {isAuthenticated,user} = useSelector(state =>state.authState)
  const {items:cartItems} = useSelector(state =>state.cartState)
  
  
  const dispatch = useDispatch();
  const navigate= useNavigate()
  
    
    const logOutHandler = ()=>{
        dispatch(logOut)
    } 




    

  return(
      
      
<>
      
        <Navbar  key={'lg'} expand={'lg'} className="bg-body-tertiary" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand  className="pe-5">
              <Link to="/">  <img
              alt=""
              src="/images/logo.png"
              width="150"
              height="50"
              className="d-inline-block align-top"
              
            />
            </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'lg'}`} />
            <Search/>
            
            <Navbar.Offcanvas data-bs-theme="dark"
              id={`offcanvasNavbar-expand-${'lg'}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${'lg'}`}
              placement="end"
            >
              <Offcanvas.Header closeButton  >
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'lg'}`} >
                <img
              alt="logo "
              src="/images/logo.png"
              width="150"
              height="50"
              className="d-inline-block align-top"
            />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body >
              

 

                <Nav className="justify-content-end flex-grow-2 ps-5 ">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  {isAuthenticated?
          (<Dropdown className="d-line">
            <DropdownToggle variant="default text-white" id="dropdown-basic">
              <figure className="avatar avatar-nav">
                <Image width="50px" src={user.avatar??'/images/default_avatar.png'}/>
              </figure>
              <span className="pe-4">{user.name}</span>
            </DropdownToggle>
            <DropdownMenu>
              {user.role ==='admin'&&
              <DropdownItem onClick={()=>{navigate('/admin/dashboard')}} className="text-white">Dashboard</DropdownItem>
              }
            <DropdownItem  className="text-white" onClick={()=>{navigate('/myprofile')}} >Profile</DropdownItem>
            <DropdownItem  className="text-white" onClick={()=>{navigate('/orders')}} >Orders </DropdownItem>
              <DropdownItem onClick={logOutHandler} className="text-danger">
                 Log out
              </DropdownItem>
              
            </DropdownMenu>
          </Dropdown>)
          
          :<Link to="/login"   className="btn" variant="outline-success" id="login_btn">Login</Link>}
                <Link to="/cart"   className="btn btn-primary  ms-3" id="cart">Cart <span className="ms-1" id="cart_count">{cartItems.length} </span></Link>
                
                </Nav>
                
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

    </>


   )
};
