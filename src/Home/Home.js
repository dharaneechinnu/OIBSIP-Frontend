/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import chickenCheesePizza from "../Img/chicken.jpg";
import paneerPizza from "../Img/panner.jpg";
import bbqPizza from "../Img/bbq.jpg";
import chilliPizza from "../Img/chilli.jpg";
import tandooriPizza from "../Img/tandoori.jpg";
import vegPizza from "../Img/vegpizza.jpg";
import vegPaneerCheesePizza from "../Img/vegpanner.jpg";
import './Home.css';
import Nav from '../Nav/Nav';

const Home = ({ setUserId,handleCartClick, handleLogout }) => {

  const history = useNavigate()
  
  
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      
    }
    else{
      history('/')
    }
  }, [history, setUserId]);


const pizzas = [
  { title: 'Chicken Cheese ', price: 300, image: chickenCheesePizza },
  { title: 'Paneer Pizza', price: 425, image: paneerPizza },
  { title: 'BBQ Pizza', price: 500, image: bbqPizza },
  { title: 'Chilli Pizza', price: 899, image: chilliPizza },
  { title: 'Tandoori Pizza', price: 499, image: tandooriPizza },
  { title: 'Veg Pizza', price: 439, image: vegPizza },
  { title: 'Veg Paneer', price: 299, image: vegPaneerCheesePizza }
];

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

  return (
    <>
   
    <div className="home-container">
      <div className="nav"> <Nav handleCartClick={handleCartClick} handleLogout={handleLogout}/></div>
  
      <div className="slo"> 
        <h2 className='slo_1'>Slice of Happiness!</h2>
        <h3 className='slo_2'>Late Time Hungry!</h3>
        <h3 className='slogan'>Experience the Best Pizza in Town!</h3>
       
        <a onClick={() => scrollToSection('order')} className='order-btn'>Order Now</a>
       
      </div>
    
      <div className="main" >
        <h2 className='centers' id='order'>Order Your Pizza</h2>
        <div className="shop-content" >
          {pizzas.map((pizza, index) => (
           <Link key={index} to={{ pathname: `/custom/${pizza.title}`, pizzaName: pizza.title }} style={{ color: 'inherit', textDecoration: 'inherit'}}>

              <div className="food-box">
                <div className="pic">
                  <img src={pizza.image} alt="" className="logo" /> 
                </div>
                <h2 className="food-title" >{pizza.title}</h2> 
                
              </div>
            </Link>
          ))}
        </div>  
      </div>
    </div>
    </>
  );
};

export default Home;
