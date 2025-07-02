import { createClient } from "@/lib/server";
import { redirect } from "next/navigation";
import HomePage from "@/components/Homepage";

export default async function Home() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
   <>
    <HomePage />
   </>
  );
}
