"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth, signIn } from "../../auth";
import { User } from "lucide-react";
import { revalidatePath } from "next/cache";

export const loginSignup = async (formData: FormData, isLogin: boolean) => {
  let user: { isAdmin: boolean } | null = null;

  try {
    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    // Check if any required fields are missing
    if (!email || !password || (!isLogin && !name)) {
      return { error: "All fields are required" };
    }

    // Check if user exists
    user = await db.user.findUnique({
      where: { email },
      select: { isAdmin: true },
    });

    const result = await signIn("credentials", {
      redirect: false,
      name,
      email,
      password,
      isLogin,
      callbackUrl: "http://localhost:3000", // Fixed callback URL
    });

    if (result?.error) {
      return {
        error: isLogin ? "Wrong credentials" : "Credentials already exist",
      };
    }

    // Check if it's a signup or login
    if (!isLogin && !result?.error) {
      // For successful signup
      redirect("http://localhost:3000/login");
    } else if (user?.isAdmin) {
      // For successful login as admin
      redirect("http://localhost:3000/dashboard");
    } else {
      // For successful login as regular user
      redirect("http://localhost:3000");
    }
  } catch (error) {
    if ((error as Error)?.message === "NEXT_REDIRECT") {
      if (user?.isAdmin) {
        redirect("http://localhost:3000/dashboard");
      } else {
        redirect("http://localhost:3000");
      }
    }
    return { error: "An unexpected error occurred" };
  }
}

export const updateUser = async (id: string, userId: string, isAdmin: boolean) => {
  let inventory;
  try {
    inventory = await db.inventory.updateMany({
      where: { id },
      data: { userId },
    });
    if (!inventory) {
      return { error: "Failed to transfer" };
    }
  } catch (error) {
    return { error: "Failed to transfer" };
  }
  revalidatePath(`${isAdmin ? "dashboard" : "/"}`);
  return inventory;
}

export const updateUserRole = async (formData: FormData, isAdmin: boolean, data: any) => {
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!email || !password || !name) {
    return { error: "All fields are required" };
  }

  // Check if the email exists in the database
  const checkEmail = await db.user.findUnique({ where: { email } });

  if (!checkEmail) {
    return { error: "User not found" }; // Corrected error handling
  }

  let user;
  try {
    user = await db.user.updateMany({
      where: { id: data?.id },
      data: { name, email, password, isAdmin },
    });

    if (!user) {
      return { error: "User not updated" };
    }
  } catch (error) {
    return { error: "User not updated" };
  }
  revalidatePath(`/dashboard/clients`);
  return user;
}

///add or update inventory

// export const addUpdateInventory = async (formData: FormData, data: any) => {
//   const session = await auth();

//   const name = formData.get("name") as string | null;
//   const quantity = formData.get("quantity") as string | null;
//   const getPrice = formData.get("price") as string | null;
//   const price = Number(getPrice);
//   const quantityNumber = Number(quantity);

//   // Fetch the user based on session email
//   const user = await db.user.findUnique({
//     where: { email: session?.user?.email! },
//   });

//   if (!quantity || !price || !name) {
//     return { error: "All fields are required" };
//   }

//   // Check if user is found
//   if (!user) {
//     return { error: "User not found" };
//   }

//   let inventory;
//   try {
//     if (data?.id) {
//       // Update existing inventory if id exists
//       inventory = await db.inventory.update({
//         where: { id: data?.id },
//         data: { name, quantity: quantityNumber, price, userId: user?.id },
//       });
//     } else {
//       // Create new inventory if id doesn't exist
//       inventory = await db.inventory.create({
//         data: { name, quantity: quantityNumber, price, userId: user?.id },
//       });
//     }

//     if (!inventory) {
//       return { error: "Failed to create or update inventory" };
//     }
//   } catch (error) {
//     return { error: "Failed to create or update inventory" };
//   }

//   // Revalidate the path after the update/create
//   revalidatePath(`/dashboard`);
//   return inventory;
// };

export const addUpdateInventory = async (formData: FormData, data: any) => {
  const session = await auth();

  const name = formData.get("name") as string | null;
  const quantity = formData.get("quantity") as string | null;
  const getPrice = formData.get("price") as string | null;
  const price = Number(getPrice);
  const quantityNumber = Number(quantity);

  // Calculate total cost
  const totalCost = quantityNumber * price;

  // Fetch the user based on session email
  const user = await db.user.findUnique({
    where: { email: session?.user?.email! },
  });

  if (!quantity || !price || !name) {
    return { error: "All fields are required" };
  }

  // Check if user is found
  if (!user) {
    return { error: "User not found" };
  }

  let inventory;
  try {
    if (data?.id) {
      // Update existing inventory if id exists
      inventory = await db.inventory.update({
        where: { id: data?.id },
        data: { name, quantity: quantityNumber, price, totalCost, userId: user?.id },
      });
    } else {
      // Create new inventory if id doesn't exist
      inventory = await db.inventory.create({
        data: { name, quantity: quantityNumber, price, totalCost, userId: user?.id },
      });
    }

    if (!inventory) {
      return { error: "Failed to create or update inventory" };
    }
  } catch (error) {
    return { error: "Failed to create or update inventory" };
  }

  // Revalidate the path after the update/create
  revalidatePath(`/dashboard`);
  return inventory;
};

export const DeleteInventory = async(id:string)=>{
  try{
    const result = await db.inventory.delete({
      where:{id},
    });

    revalidatePath("/dashboard");
    
    if(!result){
      return {error: "Inventory not deleted"};
    }
  }catch (error){
    return {error: "Failed to delete inventory"};
  }
  
};


