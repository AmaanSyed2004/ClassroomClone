import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

interface ClassesContextProps {
  classes: any[];
  setClasses: React.Dispatch<React.SetStateAction<any[]>>;
}

const ClassesContext = createContext<ClassesContextProps | undefined>(
  undefined
);

export const ClassesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    const getClasses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/course/get", {
          withCredentials: true,
        });
        setClasses(response.data.courses);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    getClasses();
  }, []);
  console.log(classes);
  return (
    <ClassesContext.Provider value={{ classes, setClasses }}>
      {children}
    </ClassesContext.Provider>
  );
};

export const useClasses = () => {
  const context = useContext(ClassesContext);
  if (!context) {
    throw new Error("useClasses must be used within a ClassesProvider");
  }
  return context;
};
