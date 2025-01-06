import React from 'react'
import { auth } from '../../../../auth'
import { db } from '@/lib/db'
import ClientsData from '@/components/ClientsData'

const ClientsPage = async () => {
    const session = await auth()
    const users = db.user.findMany({
        where: {NOT: {email: session?.user?.email! }},
    });
  return <ClientsData data={users}/>;
}

export default ClientsPage