import React from 'react'
import Navbar from '@/components/Layout/Navbar'
import LoginRegisterForm from '@/components/Layout/LoginRegisterForm'
import useAuth from '@/components/Hooks/useAuth';
import { useRouter } from 'next/router';

const index = () => {
  const { auth } = useAuth();
  const router = useRouter();

  const onSubmitRegister = async (data) => {
    const res = await auth("register", data);
    return res;
  }

  const onSubmitLogin = async (data) => {
    const res = await auth("login", data);
    if (res?.status === 200) {
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }

    return res;
  }

  return (
    <div>
      <Navbar />
      <LoginRegisterForm onSubmitRegister={onSubmitRegister} onSubmitLogin={onSubmitLogin} />
    </div>
  )
}

export default index