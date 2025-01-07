"use client"
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { updateUser } from '@/actions/user';
import { toast } from 'sonner';

// Define a type for client and task (you should adjust this to match the actual data structure)
type Client = {
  id: string;
  name: string;
};

type Task = {
  id: string;
  userId: string;
  clients: Client[];
};

interface AssignInventoryActionsProps {
  row: { original: Task };
}

const AssignInventoryActions: React.FC<AssignInventoryActionsProps> = ({ row }) => {
    const task = row.original;
    const client = task.clients.find((cli) => cli.id === task.userId);

    const handleChange = async (userId: string) => {
        const res = await updateUser(task.id, userId, false);

        if ('error' in res) {
          toast(res.error);
      } else {
          toast("Inventory successfully transferred");
      }
    }

    return (
        <div className='flex gap-8'>
            <Select onValueChange={handleChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={client ? `Transfer to ${client.name}` : "Select a client"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Select a user</SelectLabel>
                        {task.clients.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                                {item.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default AssignInventoryActions;
