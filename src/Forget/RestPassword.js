import React, { useState } from 'react';
import api from '../Api/Api';
import { useNavigate } from 'react-router-dom';
import './Rest.css'; // Import custom CSS for styling
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Restpassword = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  
  const history = useNavigate();

  const handleResetPassword = async () => {
    try {
      const response = await api.post('/Auth/respwd', { token, pwd: password });
      if (response.status === 200) {
        toast.success('Password reset successful');
        setToken('');
        setPassword('');
        history('/');
      } else {
        toast.error('Failed to reset password');
      }
    } catch (error) {
      toast.error('Failed to reset password');
    }
  };

  return (
    <>
      <div className="rest-wrapper">
        <div className="backss">
          <div className="bassck">
          <h2 className="reset-title">Reset Password</h2>
            <div className="reset-container">
             
              <input
                type="text"
                placeholder="Enter reset Code"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="reset-input"
              />
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="reset-input"
              />
              <button onClick={handleResetPassword} className="reset-button">Reset Password</button>
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Restpassword;
