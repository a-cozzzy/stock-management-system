import React from 'react';
import { auth } from '../../../../auth';
import { db } from '@/lib/db';
import ClientsData from '@/components/ClientsData';

const ClientsPage = async () => {
  const session = await auth();

  // Safely check if session?.user?.email exists
  if (!session?.user?.email) {
    // Handle the case where email is missing, maybe redirect or show an error
    return <div>Error: No user session found</div>;
  }

  const users = await db.user.findMany({
    where: {
      NOT: { email: session.user.email },
    },
  });

  return <ClientsData data={users} />;
};

export default ClientsPage;
