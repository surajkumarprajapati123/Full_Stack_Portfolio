import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Assuming you use axios for HTTP requests
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ResetPasswordToken } from '@/store/slice/forgatePasswordSlice';
import SpecialLoadingButton from './sub_componetes/Special_loadingButton';

function PasswordReset() {
  const { token } = useParams(); // Fetch token from URL params
  const [password, setPassword] = useState('');
  const dispath = useDispatch()
  const navigate = useNavigate()
  const {error,message,loading} = useSelector((state)=>state.forgatePassword)
  const handleResetPassword = async (e) => {
     e.preventDefault()
     dispath(ResetPasswordToken(token,password))
  };

  useEffect(()=>
  {
       if(error){
        toast.error(error)
       }
       if(message!==null){
        toast.success(message)
        navigate("/login")
       }
  },[dispath,error,message])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Your Password</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={ handleResetPassword}>
          <input type="hidden" name="token" value={token} />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="New password"
              />
            </div>
          </div>

          <div>
            {loading ? <SpecialLoadingButton  content={"loading..."}/>: <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Password
            </button> }
           
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordReset;
