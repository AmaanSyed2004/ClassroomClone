import React, { useEffect, useState } from "react";
import ClassCard from "@/components/ClassCard";
import { useClasses } from "@/context/ClassesContext";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  name: string;
}

const Home: React.FC = () => {
  const { classes } = useClasses(); 
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const getUserNameFromToken = () => {
      try {
        const cookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="));
        if (cookie) {
          const token = cookie.split("=")[1];
          const decodedToken: DecodedToken = jwtDecode(token);
          setName(decodedToken.name);
        }
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    };

    getUserNameFromToken();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-semibold">Hello, {name}!</h1>
      </div>
      {classes.length > 0 ? (
        classes.map((course: any) => {
          return (
            <ClassCard
              Title={course.title}
              Description={course.description}
              Teacher={course.teacher}
              key={course.title}
              id={course.courseID}
            />
          );
        })
      ) : (
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-medium">No classes available</h2>
        </div>
      )}
    </>
  );
};

export default Home;
