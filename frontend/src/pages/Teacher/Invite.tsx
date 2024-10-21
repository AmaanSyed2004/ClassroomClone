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
const Invite:React.FC = () => {
    const [code, setCode] = useState("");
    const[email,setEmail]=useState("");
    const navigate= useNavigate();
    async function handleSubmit() {
        console.log("Joining class with code: ", code);
        try {
            await axios.post("http://localhost:3000/course/sendInvite", { courseID:code, email:email }, { withCredentials: true })
        toast({
            variant: "default",
            title: "Success!",
            description: "Invite Email sent to the student!",
        })
        navigate("/HomePage");
        } catch (error:any) {
            console.log(error);
          toast({
            variant: "destructive",
            title: "Oh No! An error occured!",
            description: error.response.data.message,
            });
            
        }
    }
  return (
    <div className='h-full w-full flex justify-center items-center'>
    <Card className="w-1/4 bg-[#eeeeee] ">
        <CardHeader>
          <CardTitle>Invite a student</CardTitle>
          <CardDescription>Enter the email of the student, as well as the course ID.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            id="email"
            type="email"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="code"
            type="text"
            value={code}
            placeholder='Course ID'
            onChange={(e) => setCode(e.target.value)}
            required
            className='mt-4'
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

export default Invite