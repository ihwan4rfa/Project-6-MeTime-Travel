import React from 'react'
import Navbar from '@/components/Layout/Navbar'
import LoginRegisterForm from '@/components/Layout/LoginRegisterForm'
import useAuth from '@/components/Hooks/useAuth';

const index = () => {
  const { auth } = useAuth();

  const handleRegister = async (data) => {
    const res = await auth("register", data);
    return res;
  }

  return (
    <div>
      <Navbar />
      <LoginRegisterForm onSubmit={handleRegister} />
    </div>
  )
}

export default index