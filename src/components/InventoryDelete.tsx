import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DeleteInventory } from '@/actions/user'; // Ensure correct import path
import { toast } from 'sonner';

export function InventoryDelete({ data }: any) {
  // Handling the delete action
  const handleDelete = async () => {
    if (data?.id) {
      const response:any = await DeleteInventory(data?.id); // Make sure the DeleteInventory function handles this properly
      if ("error" in response) {
        toast.error(response.error);
      } else {
        // Use the name or other property from `data` for a success message
        toast.success(`Inventory deleted successfully!`);
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className='text-red-600'>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete this inventory?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default InventoryDelete;
