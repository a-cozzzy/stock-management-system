"use client"
import { loginSignup } from '@/actions/user'
import FormInput from '@/components/FormInput'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useOptimistic} from 'react'
import { toast } from 'sonner'

const login = () => {
  const [loading, setloading] = useOptimistic(false);
  const handleSubmit = async(formData: FormData)=>{
    setloading(true);
    const res = await loginSignup(formData,true);
    if (res?.error) {
      toast(res.error);  
    } else {
      toast("Signup successful!");  
    }
    setloading(false);
  };

  return (
    <div className='grid place-content-center min-h-screen bg-gray-100'>
      <div className='flex flex-col justify-center gap-5 items-center py-10 w-[450px] shadow-lg rounded-lg bg-white'>
        <h1 className='text-center font-bold text-4xl'> Login </h1>
        <form action={handleSubmit} className='w-full px-5'>
          <FormInput name = "email" type="email" placeholder='Enter your email' label="Email " />
          <FormInput name = "password" type="password" placeholder='Enter Password' label="Password " />
          <Button type='submit' className={`${loading && "disabled cursor-not-allowed"} w-full bg-blue-500 mt-5`}>{loading?"loading...":"Login"}</Button>
        </form>
        <Link href="/signup" className='text-center text-blue-800 cursor-pointer'> Don't have an account? Sign Up! </Link>
      </div>
    </div>
  )
}

export default login