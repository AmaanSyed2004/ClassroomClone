import React, { useState } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SignupProps {
  toggleForm: () => void;
}

export const Signup: React.FC<SignupProps> = ({ toggleForm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const {toast}= useToast();
  const navigate= useNavigate();
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Passwords do not match",
      })
      return;
    }
    try{
        const response= await axios.post("http://localhost:3000/sign/register", {
            name,
            email,
            password,
            role
            },{withCredentials: true});
        console.log(response.data)
        toast({
            title: "Success!",
            description: response.data.message
        });
      response.data.role=="teacher"?navigate("/HomePage"):navigate("/home");
            
    }   catch (e: any) {
        console.error(e)
        const errorMessage = e.response?.data?.message ?? "Please try again!";
        toast({
          variant: "destructive",
          title: "Oh No! An error occured!",
          description: errorMessage
        });
      }

    // Handle signup logic
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="flex items-center space-x-4">
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
        <div className="flex items-center space-x-4">
          <Label htmlFor="role">Role</Label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              <span>Student</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={role === "teacher"}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              <span>Teacher</span>
            </label>
          </div>
        </div>
        <div className="flex items-center space-x-4">
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
        <div className="flex items-center space-x-4">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
        </div>

        <Button type="submit" variant="default" className="w-full">
          Sign Up
        </Button>
      </form>
      <div className="text-center mt-4">
        <span>Already have an account?</span>
        <Button variant="link" className="ml-2" onClick={toggleForm}>
          Login
        </Button>
      </div>
    </div>
  );
};
