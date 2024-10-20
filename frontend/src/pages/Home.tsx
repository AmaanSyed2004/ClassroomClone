import ClassCard from "@/components/ClassCard";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";

interface DecodedToken {
  name: string;
}

const Home: React.FC = () => {
  const [classes, setClasses] = React.useState<any[]>([]);
  const [name, setName] = React.useState<string>("");
  useEffect(() => {
    try {
      const getClasses = async () => {
        const response = await axios.get("http://localhost:3000/course/get", {
          withCredentials: true,
        });
        setClasses(response.data.courses);
      };
      const getUserNameFromToken = () => {
        const cookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="));
        if (cookie) {
          const token = cookie.split("=")[1];
          const decodedToken: DecodedToken = jwtDecode(token);
          setName(decodedToken.name);
        }
      };
      getClasses();
      getUserNameFromToken();
    } catch (error) {
      console.log(error);
    }
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
