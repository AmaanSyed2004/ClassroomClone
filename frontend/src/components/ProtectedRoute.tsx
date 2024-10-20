import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext.tsx";
import { toast } from "@/hooks/use-toast.ts";

const ProtectedRoute: React.FC = () => {
  const [isAuth, setisAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get("http://localhost:3000/sign/verify", {
          withCredentials: true,
        });
        setUserData(response.data.user);
        setisAuth(response.data.isAuth);
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
  return isAuth ? (
    <AuthContext.Provider value={userData}>
      <Outlet />
    </AuthContext.Provider>
  ) : (
    <Navigate to="/auth" />
  );
};
export default ProtectedRoute;