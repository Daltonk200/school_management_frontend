"use client";
import React, { useState } from "react";
// import style from './page.module.css';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Initialize toast instance
  // const toast = new toast();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const userData = {
      email,
      password,
    };
  
    try {
      const response = await fetch("https://school-management-db-2.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (data.token) {
          try {
              localStorage.setItem("token", data.token);
            toast.success("Login successful!");
            router.push("/dashboard");
          } catch (storageError) {
            console.error("Failed to save token to localStorage:", storageError);
          }
        }
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
        toast.error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred. Please try again later.");
      toast.error("An error occurred. Please try again later.");
    }
  };
  

  return (
    <section className="">
      <div className=""></div>
      <div className="">
        <div className="">
          <h2>Login</h2>
          <p>Welcome Back</p>
          <form onSubmit={handleSubmit}>
            <div className="my-2">
              <i className="fa-regular fa-envelope" aria-hidden="true"></i>
              <input
                type="email"
                placeholder="Email"
                value={email}
                className="text-black"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="my-2">
              <i className="fa fa-lock" aria-hidden="true"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                className="text-black"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                aria-hidden="true"
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <button type="submit" className="bg-blue-400 p-4">Login</button>
            {error && <p className="text-red-600">{error}</p>}
          </form>
          <div className="flex">
            <Link href={"/forgotpassword"}>Forgot Password?</Link>
          </div>
          <div className="flex items-center">
            <p>Or login with</p>
            <div className="flex">
              <p>Don&#39;t have an account yet?</p>
              <Link href={"/register"}>Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;