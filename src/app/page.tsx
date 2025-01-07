import AppBar from "@/components/AppBar";
import AuthDesign from "@/components/AuthDesign";
import { auth } from "../../auth";
import { db } from "@/lib/db";
import ClientComp from "@/components/ClientComp";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  // Ensure session and session.user.email exist
  if (session && session.user?.email) {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: { inventories: true }
    });

    console.log(user, "user");

    if (user) {
      if (!user.isAdmin) {
        return (
          <>
            <AppBar />
            <ClientComp user={user} />
          </>
        );
      } else {
        redirect("/dashboard");
      }
    }
  }

  return (
    <div className="">
      <AppBar />
      <AuthDesign />
    </div>
  );
}
