import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from "axios"
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
const Join:React.FC = () => {
    const [code, setCode] = useState("");
    const navigate= useNavigate();
    async function handleSubmit() {
        console.log("Joining class with code: ", code);
        try {
            await axios.post("http://localhost:3000/course/join", { courseID:code }, { withCredentials: true })
        toast({
            variant: "default",
            title: "Success!",
            description: "Successfully joined class",
        })
        navigate("/home");
        } catch (error:any) {
            console.log(error);
          toast({
            variant: "destructive",
            title: "Oh No! An error occured!",
            description: "Failed to join class: " + error.response.data.message,
            });
            
        }
    }
  return (
    <div className='h-full w-full flex justify-center items-center'>
    <Card className="w-1/4 bg-[#eeeeee] ">
        <CardHeader>
          <CardTitle>Join a new Class!</CardTitle>
          <CardDescription>Enter the code of the class you want to join</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            id="email"
            type="email"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="default" onClick={handleSubmit}>
            Go!
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Join