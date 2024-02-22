import React, { useState } from 'react';
import Api from '../Api/Api';
import "./Admin.css"

const Admin = ({handleLogout}) => {
    const [orders, setOrders] = useState([]);

    const handleViewOrder = async () => {
        try {
            const response = await Api.get('api/order');
            setOrders(response.data);
        } catch (error) {
            console.error("Error in Fetching Data", error);
        }
    }

    const handleStatusChange = (index, newStatus) => {

        if (orders.length === 0 || index < 0 || index >= orders.length) {
            console.error("Invalid index or empty orders array");
            return;
        }

        const orderId = orders[index]._id; 
        const updatedOrders = [...orders];
        updatedOrders[index].status = newStatus;
        setOrders(updatedOrders);


        Api.put(`/api/orders/${orderId}/status`, { status: newStatus })
            .then(response => {
                console.log('Status updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating status:', error);
               
                const rollbackOrders = [...orders];
                rollbackOrders[index].status = updatedOrders[index].status; // Revert to the previous status
                setOrders(rollbackOrders);
            });
    };

    return (
        <div className="admin-container">
            <div className="button-container">
                <button type="submit" onClick={handleViewOrder}>View Orders</button>
                <button type="submit" onClick={handleLogout}>Log out</button>
            </div>
            <div className="table-container">
                {orders.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Pizza Name</th>
                                <th>Base</th>
                                <th>Sauce</th>
                                <th>Cheese</th>
                                <th>Veggies</th>
                                <th>Quantity</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                // Only render orders that are not 'Out for Delivery'
                                order.status !== 'Out for Delivery' && (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.pizzaName}</td>
                                        <td>{order.base}</td>
                                        <td>{order.sauce}</td>
                                        <td>{order.cheese}</td>
                                        <td>{order.veggies.join(', ')}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>
                                            <select value={order.status} onChange={(e) => handleStatusChange(index, e.target.value)}>
                                                <option value="Kitchen">Kitchen</option>
                                                <option value="Out for Delivery">Out for Delivery</option>
                                                <option value="Order Received">Order Received</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-orders">No orders available</p>
                )}
            </div>
        </div>
    );
}

export default Admin;
