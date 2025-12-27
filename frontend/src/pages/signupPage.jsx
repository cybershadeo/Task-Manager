import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import  AuthContext from '../context/authContext';
import '../styles/auth.css';

function SignupPage () {
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });



    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name] : value
        }));

    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        //call my api
        try {
            await register(formData);
            setIsLoading(false);
            //navigate to a protected route
            navigate('/'); 
        } catch (err) {
            setError(err?.response?.data?.message || err.message || 'Sign up failed');
            setIsLoading(false);
        }
    }


    return (
        <div className="auth-page">
            <form className="auth-card credentials-panel signup" onSubmit={handleSubmit}>
               <h2 className="slide-element">Register</h2>

                <div className="field-wrapper slide-element">
                   <label>
                    Username
                    <input className="auth-input" type="text" name="username" onChange={handleChange} 
                     value={formData.username} required />
                   </label> 
                </div>

                <div className="field-wrapper slide-element">
                    <label>
                        Email
                        <input className="auth-input" type="email" name="email" onChange={handleChange} 
                         value={formData.email} required />
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
                    <button className="auth-button submit-button" type="submit" disabled={isLoading}> {isLoading ? 'Signing up...' : 'Register'} </button>
                </div>

                <div className="slide-element">
                    <p className="auth-footer">
                        Already have an account? <br />
                        <Link to='/signin'>Sign In</Link>
                    </p>
                </div>

            </form>
        </div>
     )
 }

 export default SignupPage