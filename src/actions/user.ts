"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { signIn } from "../../auth";
import { User } from "lucide-react";

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