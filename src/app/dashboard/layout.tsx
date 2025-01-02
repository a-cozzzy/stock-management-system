import Sidebar from '@/components/Sidebar'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'
import { auth } from '../../../auth';
import { db } from '@/lib/db';

const DashboardLayout = async ({ children }: { children: ReactNode }) => { 
  const session = await auth() 

  if (session && session?.user) { 
    const user = await db.user.findUnique({
      where: { email: session?.user?.email! },
    });

    if (user && !user?.isAdmin) {
      redirect("/"); 
    } 
  } 

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[0.25fr_1fr]">
      <div className="hidden lg:block border-r bg-gray-100/40">
        <Sidebar />
      </div>
      <div className="flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout