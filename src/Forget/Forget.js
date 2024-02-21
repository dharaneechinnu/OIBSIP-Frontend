import React, { useState } from 'react';
import api from '../Api/Api';
import { useNavigate } from 'react-router-dom';
import './Forget.css';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Forget = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const history = useNavigate();

    const handleResetPassword = async () => {
        if (!email) {
            toast.error('Please enter your email');
            return;
        }
    
        try {
            const response = await api.post('/Auth/res', { email });
            setMessage(response.data.message);
           
            if (response.status === 200) {
                history('/Auth/respwd');
            }
        } catch (error) {
            setMessage('Failed to send reset password email');
            toast.error('Failed to send reset password email');
        }
    };
    

    return (
        <div className="forget-wrapper">
            <div className="ba extra-class">
                <div className="back">
                    <div className="forget-container"> 
                        <h2 className="forget-title">Forget Password</h2> 
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="forget-input"
                        />
                        <button onClick={handleResetPassword} className="forget-button">Reset Password</button> 
                        {message && <p className="forget-message">{message}</p>} 
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Ensure that ToastContainer is included in the component */}
        </div>
    );
}

export default Forget;
