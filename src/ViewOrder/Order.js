import React, { useEffect, useState } from 'react';
import './Order.css'; 
import Nav from '../Nav/Nav';
import api from '../Api/Api';

const Order = ({userId,setPlaceorder, PlaceOrder, handleCartClick, handleLogout }) => {
    const [sortStatus, setSortStatus] = useState(null);

    const handleSortByStatus = (status) => {
        setSortStatus(status);
    };

    // Ensure PlaceOrder is an array before sorting
    const sortedOrders = Array.isArray(PlaceOrder) ? (sortStatus ? PlaceOrder.filter(order => order.status === sortStatus) : PlaceOrder) : [];

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await api.get(`api/vieworder/${userId}`);
            if (response.status === 200) {
              setPlaceorder(response.data);
              
              
            
            } else {
              console.error('Failed to fetch orders');
            }
          } catch (error) {
            console.error('Error Frontend fetching orders:', error);
          }
        };
      
      fetchOrders()
      }, [setPlaceorder, userId]);   
      
    return (
        <div className="order-container">
            <div className="nav"> <Nav handleCartClick={handleCartClick} handleLogout={handleLogout}/></div>
            <div className="status-buttons">
                <button onClick={() => handleSortByStatus('Kitchen')}>Kitchen</button>
                <button onClick={() => handleSortByStatus('Out for Delivery')}>Out for Delivery</button>
                <button onClick={() => handleSortByStatus('Order Received')}>Order Received</button>
            </div>
            <h2 className="order-title">Order Details</h2>
            {sortedOrders.length === 0 ? (
                <p>No items to display</p>
            ) : (
                <ul className="order-list">
                    {sortedOrders.map((order, index) => (
                        <li key={index} className="order-item">
                            <p><strong>PizzaName:</strong> {order.pizzaName}</p>
                            <p><strong>Base:</strong> {order.base}</p>
                            <p><strong>Sauce:</strong> {order.sauce}</p>
                            <p><strong>Cheese:</strong> {order.cheese}</p>
                            <p><strong>Veggies:</strong> {order.veggies.join(', ')}</p>
                            <p><strong>Quantity:</strong> {order.quantity}</p>
                            <p><strong>Total Price:</strong> {order.totalPrice}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Order;
