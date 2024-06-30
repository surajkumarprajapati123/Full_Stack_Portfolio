
import { getprofile } from '@/store/slice/userSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isAuthenticated}= useSelector((state)=>state.user)
  useEffect(()=>
  {
     dispatch(getprofile())
     if(!isAuthenticated){
      navigate("/login")
     }

  },[isAuthenticated])
  return (
    <>
    <div className='flex min-h-screen w-full bg-muted/40'>
    <aside className='fixed insert-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50'>

    </aside>

    </div>
    </>
  )
}

export default HomePage