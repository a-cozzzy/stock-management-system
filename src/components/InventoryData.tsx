
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import FormInput from './FormInput';
import { addUpdateInventory } from '@/actions/user';
import { toast } from 'sonner';

type Props = {
    title: string;
    data: any;
};

const InventoryData = ({ title, data }: Props) => {
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(event.target as HTMLFormElement); // Extract FormData from the form
        
        // Validation: Ensure required fields are filled out
        const name = formData.get("name")?.toString().trim();
        const quantity = formData.get("quantity")?.toString().trim();
        const price = formData.get("price")?.toString().trim();

        if (!name || !quantity || !price) {
            toast.error("Please fill all required fields.");
            return;
        }

        // Proceed with adding/updating the inventory
        const response: any = await addUpdateInventory(formData, data);

        if ("error" in response) {
            toast.error(response.error);
        } else {
            toast.success(`${title} updated successfully!`);
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">{title}</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>
                        Make changes to your inventory here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2 mt-5">
                            <div className="flex flex-col gap-5">
                                <FormInput
                                    type="text"
                                    name="name" // Name field
                                    placeholder="Name"
                                    label="Name"
                                    defaultValue={data?.name || ''}
                                />
                                <FormInput
                                    type="number"
                                    name="quantity" // Quantity field
                                    placeholder="Enter the quantity"
                                    label="Quantity"
                                    defaultValue={data?.quantity || ''}
                                />
                                <FormInput
                                    type="number"
                                    name="price" // Price field
                                    placeholder="Price in Rs."
                                    label="Price"
                                    defaultValue={data?.price || ''}
                                />
                            </div>
                        </div>
                        <Button type="submit" className="mt-5">{title}</Button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default InventoryData;


// import React from 'react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//     Sheet,
//     SheetClose,
//     SheetContent,
//     SheetDescription,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
// } from "@/components/ui/sheet";
// import FormInput from './FormInput';
// import { addUpdateInventory } from '@/actions/user';
// import { toast } from 'sonner';

// type Props = {
//     title: string;
//     data: any;
// };

// const InventoryData = ({ title, data }: Props) => {
//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault(); // Prevent the default form submission

//         const formData = new FormData(event.target as HTMLFormElement); // Extract FormData from the form
//         const response: any = await addUpdateInventory(formData, data);

//         if ("error" in response) {
//             toast.error(response.error);
//         } else {
//             toast.success("Inventory created successfully");
//         }
//     };

//     return (
//         <Sheet>
//             <SheetTrigger asChild>
//                 <Button variant="outline">{title} </Button>
//             </SheetTrigger>
//             <SheetContent>
//                 <SheetHeader>
//                     <SheetTitle>{title}</SheetTitle>
//                     <SheetDescription>
//                         Make changes to your inventory here. Click save when you're done.
//                     </SheetDescription>
//                 </SheetHeader>
//                 <div className="grid gap-4 py-4">
//                     <form onSubmit={handleSubmit}>
//                         <div className="flex flex-col gap-2 mt-5">
//                             <div className="flex flex-col gap-5">
//                                 <FormInput
//                                     type="text"
//                                     name="name" // Changed name to "name" to match the field
//                                     placeholder="Name"
//                                     label="Name"
//                                     defaultValue={data?.name}
//                                 />
//                                 <FormInput
//                                     type="text"
//                                     name="quantity" // Ensure the name matches the field
//                                     placeholder="Quantity"
//                                     label="Enter the quantity"
//                                     defaultValue={data?.quantity}
//                                 />
//                                 <FormInput
//                                     type="text"
//                                     name="price" // Ensure the name matches the field
//                                     placeholder="price in Rs."
//                                     label="Price"
//                                     defaultValue={data?.price}
//                                 />
//                             </div>
//                         </div>
//                         <Button type="submit" className="mt-5">{title}</Button>
//                     </form>
//                 </div>
//             </SheetContent>
//         </Sheet>
//     );
// };

// export default InventoryData;
