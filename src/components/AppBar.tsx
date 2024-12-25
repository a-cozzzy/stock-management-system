import Link from 'next/link'
import React from 'react'

const AppBar = () => {
  return (
    <div className='flex justify-between w-full h-14 lg:h-16 items-center border-b bg-gray-100/40 px-6'>
        <h2> Welcome to IMS</h2>

        <div className='ml-auto'>
            <div className='flex gap-4'>
                <Link href="/signup" className="font-bold">
                Sign Up 
                </Link>
                <Link href="/signin" className="font-bold">
                Sign In
                </Link>
            </div>
        </div>

    </div>
  )
}

export default AppBar