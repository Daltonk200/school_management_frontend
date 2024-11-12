"use client";
// import { headers } from 'next/headers';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearering ${token}`,
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
