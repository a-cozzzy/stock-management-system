import FormInput from '@/components/FormInput'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'

const login = () => {
  return (
    <div className='grid place-content-center min-h-screen bg-gray-100'>
      <div className='flex flex-col justify-center gap-5 items-center py-10 w-[450px] shadow-lg rounded-lg bg-white'>
        <h1 className='text-center font-bold text-4xl'> Login </h1>
        <form action="" className='w-full px-5'>
          <FormInput type="email" placeholder='Enter your email' label="Email " />
          <FormInput type="password" placeholder='Enter Password' label="Password " />
          <Button type='submit' className='w-full bg-blue-500 mt-5'>Button</Button>
        </form>
        <Link href="/signup" className='text-center text-blue-800 cursor-pointer'> Don't have an account? Sign Up! </Link>
      </div>
    </div>
  )
}

export default login