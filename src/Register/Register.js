import React, { useState } from 'react';
import './Register.css';

import api from '../Api/Api';
import { Link } from 'react-router-dom';

const Register = ({ handlesign, setName, setEmail, email, setOTP, setPassword, otp }) => {
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [isVerified, setIsVerified] = useState(false); 

  const handleGenerateOTP = async () => {
    try {
      
      if (!email) {
        console.log('Please enter your email to generate OTP.');
        return;
      }
  
      setOtpGenerated(true);
      const response = await api.post('/Auth/reg/generate', { email });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error frontend generating OTP:', error);
    }
  };
  

  const handleVerifyOTP = async () => {
    try {
      const response = await api.post('/Auth/reg/verify-otp', { email, otp });
      console.log(response.data.message);
      setIsVerified(true); 
    } catch (error) {
      console.error('Error frontend verifying OTP:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isVerified) {
    
      handlesign(e);
    } else {
      console.log('Please verify your email OTP first.');
    }
  };

  return (
    <>
      <div className="center-containers">
      
        <div className="register-containers">
          <h2 className='registers_title'>Register</h2>
          <form onSubmit={handleSubmit} id='registerForm'>
            <div className="form-groups">
              <label className='Names' htmlFor='name'>Name:</label>
              <input
                type="text"
                className='nametext'
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-groups">
              <label className='email' htmlFor='email'>Email:</label>
              <input
                type="email"
                className='emailtext'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="button" className='generate-otp' onClick={handleGenerateOTP}>
              Generate OTP
            </button>
            {otpGenerated && (
              <>
                <div className="form-groups">
                  <label className='otp' htmlFor='otp'>Enter OTP:</label>
                  <input
                    type="text"
                    className='emailtexts'
                    onChange={(e) => setOTP(e.target.value)}
                    required
                  />
                </div>
                <button type="button" className='verify-otp' onClick={handleVerifyOTP}>
                  Verify OTP
                </button>
              </>
            )}
            <div className="form-groups">
              <label className='pwd' htmlFor='pwd'>Create Password:</label>
              <input
                type="password"
                className='pwdtext'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className='submit' disabled={!isVerified}>
              Register
            </button>
          </form><br></br>
          <Link to='/' className='for'>I have Account</Link>
        </div>
      </div>
    </>
  )
}

export default Register;
