import React from 'react'
import Navbar from '@/components/Layout/Navbar'
import LoginRegisterForm from '@/components/Layout/LoginRegisterForm'
import useAuth from '@/components/Hooks/useAuth';
import { useRouter } from 'next/router';

const index = () => {
  const { auth } = useAuth();
  const router = useRouter();

  const handleRegister = async (data) => {
    const res = await auth("register", data);
    if (res?.status === 200) {
      router.push("/");
    }
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