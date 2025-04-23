"use client";
import { login, me } from "@/api/service/authService.service";
import Loading from "@/components/Loading";
import { ApiResponse } from "@/types/response.api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import imgL from "../../../public/next.svg";
import "./styles.css";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [isChecking, setChecking] = useState(true);

  useEffect(() => {
    const checkAndRedirect = async () => {
      const response = await me();
      if (response) {
        router.push("/home");
      } else {
        setChecking(false);
      }
    };
    checkAndRedirect();
  }, []);

  if (isChecking) return <Loading />;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res: ApiResponse = await login({ email, password });
    if (res.ok) {
      router.push("/home");
    }

    setError(res?.message || "");
  }

  return (
    <>
      <main className="container">
        <form onSubmit={handleSubmit}>
          <Image src={imgL} alt="Logo" width={100} height={100} priority />
          {error && <center className="alert">{error}</center>}
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input type="submit" value="Acessar" />
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </main>
    </>
  );
}
