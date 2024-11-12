"use client";
// import { headers } from 'next/headers';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) setToken(token);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("https://school-management-db-2.onrender.com/api", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearering ${token}`,
        },
      });
      const result = await response.json();
      setCourses(result.courses);

      // console.log(result.token);
      // console.log("result is :", result);

      if (token) {
        fetchCourses();
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <section>
      <h1 className="text-center">Dashboard see Courses</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.title}</td>
              <td>{course.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Dashboard;
