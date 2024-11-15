"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import styles from "./page.module.css";
// import Sidebar from "@/components/Sidebar/Sidebar";
// import Navbar from "@/components/Navbar/Navbar";

import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if(token) setToken(token);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const courseOptions = [
    "Graphic Design",
    "Web Development",
    "Cybersecurity",
    "DevOps",
    "App Development",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newCourse = { title, description };

    try {
      const response = await fetch("https://school-management-db-2.onrender.com/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearering ${token}`,
        },
        body: JSON.stringify(newCourse),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success("Course added successfully!");
        setTitle("");
        setDescription("");
        router.push("/dashboard");
      } else {
        toast.error(
          `Failed to add course: ${data.error || "something went wrong"}`
        );
      }
    } catch (error) {
      toast.error("Failed to add course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className=""></div>
      <div className="">
        <div className=""></div>
        <div className="">
          <div className="">
            <h1 className="text-center mb-1">Add Course</h1>
            <form onSubmit={handleSubmit} className="">
              <label className="">Course Name</label>
              <select
                className="block mb-3 text-black"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={isLoading}
              >
                <option value="">{title}</option>
                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>

              <label className="">Description of course</label>
              <input
                className="block mb-3 text-black"
                type="text"
                placeholder="Description of course"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
                required
              />

              <button
                className="bg-blue-400 mt-4 p-4"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
