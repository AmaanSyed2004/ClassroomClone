import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext.tsx";
import { toast } from "@/hooks/use-toast.ts";
import { ClassesProvider } from "../context/ClassesContextTeacher";

const ProtectedRouteTeacher: React.FC = () => {
  const [isAuth, setisAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState<boolean | null>(null);
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get("http://localhost:3000/sign/verify", {
          withCredentials: true,
        });
        console.log(response.data.user)
        setUserData(response.data.user);
        setisAuth(response.data.isAuth);
        setRole(response.data.user.role=="teacher"? true:false);
      } catch (err) {
        console.error(err);
        toast({
            variant: "destructive",
            title: "Oh No! An error occured!",
            description: "Please login first!"
        })
        setisAuth(false);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);
  if (loading) return <div> Loading</div>;
  return role ? (
    <AuthContext.Provider value={userData}>
      <ClassesProvider>
       <Outlet />
      </ClassesProvider>
    </AuthContext.Provider>
  ) : (
    <Navigate to="/auth" />
  );
};
export default ProtectedRouteTeacher;