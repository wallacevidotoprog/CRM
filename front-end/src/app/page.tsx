'use client';
import { me } from "@/api/service/authService.service";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isChecking, setChecking] = useState(true);
  
  useEffect(() => {
      const checkAndRedirect = async () => {
        const response = await me();        
        if (response) {
          router.push("/home");
        }
        else {
          router.push("/login");
        }
      };
      checkAndRedirect();
    },[]);

   if (isChecking) return <Loading />;
  return (
   <>
   <main className="container">
    </main>
   </>
  );
}
