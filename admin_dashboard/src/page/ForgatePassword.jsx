import { forgatePassword } from '@/store/slice/forgatePasswordSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './sub_componetes/Special_loadingButton';

function ForgatePassword() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector((state)=>state.user)
  const { error, message ,loading } = useSelector((state) => state.forgatePassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgatePassword(email));
  };
  console.log("message is",message)

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message !== null) {
      toast.success(message);
      navigate("/")
    }
    // if(isAuthenticated){
    //   navigate("/")
    // }
  }, [dispatch, error, message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8  bg-green-300 shadow-2xl p-5">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Your Password?</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className='flex items-center justify-center m-5 mt-5 font-bold'>
              <Link to={"/login"}>
              Remember me
              </Link>
            </div>
          </div>

          <div>
            {
              loading ? <SpecialLoadingButton content={"loading..."} /> :<button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Request Reset Password
            </button>
            }
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgatePassword;
