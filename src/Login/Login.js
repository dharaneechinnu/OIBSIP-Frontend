import React from 'react'
import { Link } from 'react-router-dom';
import './Login.css'
const Login = ({  handleSubmit,setEmail,setPassword}) => {
  return (
  <>
   <div className="center-containers">
  
      <div className="login-container">
       
        <h2 className='login_title'>Login</h2>
        <form onSubmit={handleSubmit}  id='loginForm'>
        
          <div>
            <label className='Name' htmlFor='email'>E-mail:</label><br></br>
            <input
              type="email"
              id='email'
              name='email'
              className='names_text'
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className='password' htmlFor='password'>Password:</label>
            <input
              type="password"
              id='password'
              name='password'
              className='pwd_text'
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <br />
          <p>
            Don't have an account <Link to='/reg'>SignUp</Link>
          </p><br></br>
           <Link to='/Auth' className='for'>forget password?</Link>
          <button type="submit" className='sub_text'>Login</button>
        </form>
      </div>
    </div>
  </>
  )
}

export default Login