import { Link, useNavigate } from 'react-router-dom';
import {  useState, useContext } from 'react';
import  AuthContext from '../context/authContext';
import '../styles/auth.css';


function SigninPage () {
   const navigate = useNavigate();
   const { login } = useContext(AuthContext)

   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [formData, setFormData] = useState({
      username: '',
      password: ''
   });

   function handleChange(e) {
      const { name, value } = e.target;
      setFormData( prevData => ({
         ...prevData,
         [name] : value
      }));
   }

   //call my api
   async function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try {
         await login(formData);
         setIsLoading(false);
         //navigate to protected page after login
         navigate('/'); 
      } catch (err) {
         setError(err?.response?.data?.message || err.message || 'Login failed');
         setIsLoading(false);
      }

   }


    return (
        <div className="auth-page">
            <form className="auth-card credentials-panel signin" onSubmit={handleSubmit}>
               <h2 className="slide-element">Login</h2>

               <div className="field-wrapper slide-element">
                  <label>
                    Username
                    <input className="auth-input" type="text" name="username" onChange={handleChange} 
                     value={formData.username} required />
                  </label>
               </div>  

               <div className="field-wrapper slide-element">
                  <label>
                     Password
                     <input className="auth-input" type="password" name="password" onChange={handleChange} 
                      value={formData.password} required />
                  </label>
               </div>
               <div className="slide-element">
                  {error && <p className="auth-error"> {error} </p>}
               </div>

               <div className="slide-element">
                  <button className="auth-button submit-button" type="submit" disabled={isLoading} > {isLoading ? 'Logging in..' : 'Login'} </button>
               </div>

               <div className="slide-element">
                  <p className="auth-footer">
                     Don't have an account? <br/>
                     <Link to='/signup'>Sign Up</Link>
                  </p>
               </div>

            </form>
        </div>
    )
}

export default SigninPage;