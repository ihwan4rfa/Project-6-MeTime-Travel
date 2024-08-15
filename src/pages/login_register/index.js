import React from 'react'
import Navbar from '@/components/Fragments/Navbar'
import LoginRegisterForm from '@/components/Fragments/LoginRegisterForm'
import useAuth from '@/Hooks/useAuth';

const index = () => {
  const { auth } = useAuth();

  const onSubmitRegister = async (data) => {
    const res = await auth("register", data);
    return res;
  }

  const onSubmitLogin = async (data) => {
    const res = await auth("login", data);
    return res;
  }

  return (
    <div className='cursor-default lg:cursor-none'>
      <Navbar />
      <LoginRegisterForm onSubmitRegister={onSubmitRegister} onSubmitLogin={onSubmitLogin} />
    </div>
  )
}

export default index