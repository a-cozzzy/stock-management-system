import Link from 'next/link'
import React from 'react'
import { auth} from '../../auth'
import { signOut } from 'next-auth/react';


const AppBar = async () => {
  const session = await auth();

  return (
    <div className='flex justify-between w-full h-14 lg:h-16 items-center border-b bg-gray-100/40 px-6'>
      {session && session?.user ? (
        <h2>Welcome {session?.user?.name}</h2>
      ) : (
        <h2>Welcome to IMS</h2>
      )}

      <div className='ml-auto'>
        {session && session?.user ? (
          <form action={async () => {
            "use server"
            await signOut({ redirectTo: '/login' })
          }}>
            <button type="submit">Sign Out</button>
          </form>
        ) : (
          <div className='flex gap-4'>
            <Link href="/signup" className="font-bold">
              Sign Up
            </Link>
            <Link href="/signin" className="font-bold">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default AppBar