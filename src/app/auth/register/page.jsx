"use client";
import React, { useState } from "react";
// import style from './page.module.css';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  // const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Initialize Notyf instance
  const notyf = new Notyf();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name,
          email,
          role,
          password,
          password_confirm: confirmPassword,
        }),
      });

      const result = await res.json();
      // console.log("The result is ",result);
      
      if (res.ok) {
        notyf.success("Registration successful!");
        router.push("/auth/login");
      } else {
        setError(result.message || "Registration failed. Please try again.");
        notyf.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log("An error occurred:", error);
      setError("Something went wrong. Please try again later.");
      notyf.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <section>
      <div className=""></div>
      <div className="">
        <div className="">
          <h2>Hello!</h2>
          <p>Sign up and get started</p>
          <form onSubmit={handleSubmit}>
            <div className="py-4">
              <i className="fa fa-user" aria-hidden="true"></i>
              <input
                type="text"
                placeholder="First Name"
                value={name}
                className="text-black"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="my-2">
              <i className="fa fa-envelope" aria-hidden="true"></i>
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
                style={{ cursor: "pointer" }}
              ></i>
            </div>
            <div className="my-2">
              <i className="fa fa-lock" aria-hidden="true"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                className="text-black"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                aria-hidden="true"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
            <div className="py-4">
              <i className="fa fa-user" aria-hidden="true"></i>
              <input
                type="text"
                placeholder="Role"
                value={role}
                className="text-black"
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="bg-blue-400 p-4">Register</button>
            {error && <p className="">{error}</p>}
          </form>
          <div className="my-1 flex items-center">
            <p>Or sign up with</p>
            <div className="p-4">
              <p>Do you have an account already?</p>
              <Link href={"/login"}>Login</Link>
            </div>
          </div>
        </div>
      </div>
      </section>
  );
}

export default Page;