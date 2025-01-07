// import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import FormInput from './FormInput'
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { updateUserRole } from '@/actions/user'
// import { toast } from 'sonner'


// const ClientActions = ({ row }: any) => {
//   const data = row.original;

//   const [isAdmin,setIsAdmin]=useState(data?.role);

//   const handleSubmit=async(formData:FormData)=>{
//     const role= isAdmin=="admin"?true:false;
//     const response = await updateUserRole(formData,role,data);
  
//     if ("error" in response) {
//       toast.error(response.error);
//     } else {
//       toast.success("User updated successfully");
//     }
//   };
  
//   }

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="outline">Edit User</Button>
//       </SheetTrigger>
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle>Edit User</SheetTitle>
//           <SheetDescription>
//             Make changes to your user here. Click save when you're done.
//           </SheetDescription>
//         </SheetHeader>
//         <div className="grid gap-4 py-4">
//         <form onSubmit={handleSubmit}>
//           {/* <form action={handleSubmit}> */}
//             <div className='flex flex-col gap-2 mt-5'>
//               <div className='flex flex-col gap-5'>
//                 <FormInput type="text" name="name" label="Name" defaultValue={data?.name} />
//                 <FormInput type="email" name="email" label="Email" defaultValue={data?.email} />
//                 <FormInput type="password" name="password" label="Password" defaultValue={data?.password} />
//                 <Label htmlFor="name" className='mb-3 text-sm font-medium text-gray-700'>
//                   Select Role
//                 </Label>
//                 <Select onValueChange={(val)=>setIsAdmin(val)}>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder={data?.isAdmin ? "Admin" : "User"} />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       <SelectLabel>Select a user</SelectLabel>
//                       {["admin","user"]?.map((item: any) => (
//                         <SelectItem key={item} value={item}>{item}</SelectItem>
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <Button type="submit" className='mt-5'>Save changes</Button>
//           </form>
//         </div>
//       </SheetContent>
//     </Sheet>
//   )
// }

// export default ClientActions


import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import FormInput from './FormInput'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateUserRole } from '@/actions/user'
import { toast } from 'sonner'

const ClientActions = ({ row }: any) => {
  const data = row.original;

  const [isAdmin, setIsAdmin] = useState(data?.role || 'user'); // default to 'user'

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const role = isAdmin === "admin"; // check if admin
    const formData = new FormData(event.target as HTMLFormElement); // get form data

    const response = await updateUserRole(formData, role, data);

    if ("error" in response) {
      toast.error(response.error);
    } else {
      toast.success("User updated successfully");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit User</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit User</SheetTitle>
          <SheetDescription>
            Make changes to your user here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2 mt-5'>
              <div className='flex flex-col gap-5'>
                <FormInput type="text" name="name" label="Name" defaultValue={data?.name} />
                <FormInput type="email" name="email" label="Email" defaultValue={data?.email} />
                <FormInput type="password" name="password" label="Password" defaultValue={data?.password} />
                <Label htmlFor="role" className='mb-3 text-sm font-medium text-gray-700'>
                  Select Role
                </Label>
                <Select value={isAdmin} onValueChange={(val) => setIsAdmin(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={isAdmin === "admin" ? "Admin" : "User"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select a user</SelectLabel>
                      {["admin", "user"].map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className='mt-5'>Save changes</Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ClientActions;
