import React, { useState } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  toggleForm: () => void;
}

export const Login: React.FC<LoginProps> = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/sign/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast({
        title: "Success!",
        description: response.data.message,
      });
      response.data.role=="teacher"?navigate("/HomePage"):navigate("/home");
    } catch (e: any) {
      console.error(e);
      const errorMessage = e.response?.data?.message ?? "Please try again!";
      toast({
        variant: "destructive",
        title: "Oh No! An error occured!",
        description: errorMessage,
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className=" flex items-center space-x-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className=" flex items-center space-x-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <Button type="submit" variant="default" className="w-full">
          Login
        </Button>
      </form>
      <div className="text-center mt-4">
        <span>Don't have an account?</span>
        <Button variant="link" className="ml-2" onClick={toggleForm}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};
