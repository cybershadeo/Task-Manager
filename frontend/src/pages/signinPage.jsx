import { Link, useNavigate } from 'react-router-dom';
import {  useState } from 'react';
import  { useAuth} from '../hooks/AuthUseContext';



function SigninPage () {
   const navigate = useNavigate();
   const { login } = useAuth();

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100" 
                  onSubmit={handleSubmit}
            >
               <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center tracking-tight">
                  Login
               </h2>

                <div className='mb-5'>
                   <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                    Username
                    <input className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400' 
                           type="text" name="username" onChange={handleChange} 
                           value={formData.username} placeholder='Enter your username'
                           required 
                    />
                   </label> 
                </div>

               <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
                     Password
                     <input className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400" 
                            type="password" name="password" onChange={handleChange} 
                            value={formData.password} required 
                     />
                  </label>
               </div>
               <div className="min-h-[32px] mb-4">
                  {error && (
                     <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg animate-in fade-in slide-in-from-top-1"> 
                        {error} 
                     </p> 
                  )}
               </div>

               <div>
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed" 
                            type="submit" disabled={isLoading}
                    > 
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Login in...
                            </span>
                            ) : 'Login'} 
                    </button>
                </div>

               <div className="t-8 text-centerm">
                  <p className="text-gray-600 text-sm">
                     Don't have an account? <br/>
                     <Link to='/signup' className='text-indigo-600 font-semibold hover:text-indigo-500 underline-offset-4 hover:underline'>
                        Sign Up
                     </Link>
                  </p>
               </div>

            </form>
        </div>
    )
}

export default SigninPage;