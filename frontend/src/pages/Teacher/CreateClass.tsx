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
const CreateClass:React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate= useNavigate();
    async function handleSubmit() {
        try {
            const response=await axios.post("http://localhost:3000/course/create", { title, description }, { withCredentials: true })
        toast({
            variant: "default",
            title: "Success!",
            description: response.data.message,
        })
        navigate("/HomePage");
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
    <div className='h-[calc(100vh-5rem)] w-full flex justify-center items-center'>
    <Card className="w-1/4 bg-[#eeeeee] ">
        <CardHeader>
          <CardTitle>Create a new Class!</CardTitle>
          <CardDescription>Enter the title and the description of the class you want to create.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            id="title"
            type="text"
            value={title}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
            className='mb-4'
            required
          />
        <Input
            id="title"
            type="text"
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

export default CreateClass