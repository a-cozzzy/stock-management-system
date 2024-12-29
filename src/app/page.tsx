import AppBar from "@/components/AppBar";
import AuthDesign from "@/components/AuthDesign";
import { auth } from "../../auth";

export default async function Home() {
  const session = await auth();
  console.log(session,"session");
  return (
    <div className="">
        <AppBar />
        <AuthDesign/>
    </div>
  );
}
