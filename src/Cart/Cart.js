import React from 'react';
import api from '../Api/Api';
import Nav from '../Nav/Nav';
import './Cart.css';

const Cart = ({ cartData,handlePayment, setCartData,handleCartClick,handleLogout,totalamount }) => {

  const handleDelete = async (itemId) => {
    try {
      await api.delete(`/api/cartData/${itemId}`);
      const updatedCartData = cartData.filter((item) => item._id !== itemId);
      setCartData(updatedCartData);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };




  return (
    <div className="cart-container">
         <div className="nav"> <Nav handleCartClick={handleCartClick} handleLogout={handleLogout}/></div>
      <h2 className="cart-title">Cart</h2>
      {cartData.map((item, index) => (
        <div className="cart-item" key={index}>
          <p>
           {item.pizzaName}, {item.base}, {item.sauce}, {item.cheese},{" "}
            {item.veggies.join(", ")}, Quantity: {item.quantity}, Total
            Price: {item.totalPrice}
          </p>
          <button onClick={() => handleDelete(item._id)}>Remove</button>
        </div>
      ))}
      <p className="total-price">Total Price: {totalamount}</p>
      <button className="place-order-btn" onClick={handlePayment}>
        Place Order
      </button>
    </div>
  );
};

export default Cart;
