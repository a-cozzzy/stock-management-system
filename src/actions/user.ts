"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { auth, signIn } from "../../auth";
import { revalidatePath } from "next/cache";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface Inventory {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  totalCost: number;
  userId: string;
}

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
      callbackUrl: "http://localhost:3000/", // Fixed callback URL
    });

    if (result?.error) {
      return {
        error: isLogin ? "Wrong credentials" : "Credentials already exist",
      };
    }

    // Check if it's a signup or login
    if (!isLogin && !result?.error) {
      redirect("http://localhost:3000/");
      return; // Ensure no further code runs after redirect
    } else if (user?.isAdmin) {
      redirect("http://localhost:3000/dashboard");
      return; // Ensure no further code runs after redirect
    } else {
      redirect("http://localhost:3000/");
      return; // Ensure no further code runs after redirect
    }
    
  } catch {
    return { error: "An unexpected error occurred" };
  }
};

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
  } catch {
    return { error: "Failed to transfer" };
  }
  revalidatePath(`${isAdmin ? "dashboard" : "/"}`);
  return inventory;
};

export const updateUserRole = async (formData: FormData, isAdmin: boolean, data: User) => {
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
  } catch {
    return { error: "User not updated" };
  }
  revalidatePath(`/dashboard/clients`);
  return user;
};

export const addUpdateInventory = async (formData: FormData, data: Inventory) => {
  const session = await auth();

  const name = formData.get("name") as string | null;
  const quantity = formData.get("quantity") as string | null;
  const getPrice = formData.get("price") as string | null;
  const price = Number(getPrice);
  const quantityNumber = Number(quantity);

  // Calculate total cost
  const totalCost = quantityNumber * price;

  // Fetch the user based on session email
  if (!session?.user?.email) {
    return { error: "User email not found" };
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
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
  } catch {
    return { error: "Failed to create or update inventory" };
  }

  // Revalidate the path after the update/create
  revalidatePath(`/dashboard`);
  return inventory;
};

export const DeleteInventory = async (id: string) => {
  try {
    const result = await db.inventory.delete({
      where: { id },
    });

    revalidatePath("/dashboard");

    if (!result) {
      return { error: "Inventory not deleted" };
    }
  } catch {
    return { error: "Failed to delete inventory" };
  }
};
