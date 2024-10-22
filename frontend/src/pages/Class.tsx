import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
interface ClassDetailsProps {
  announcements: any[];
  assignments: any[];
  courseID: string;
  createdAt: string;
  createdBy: string;
  description: string;
  status: string;
  students: string[];
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

const Class: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the class ID from the URL params
  const [classDetails, setClassDetails] = useState<ClassDetailsProps | null>(
    null
  );

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/course/get/${id}`,
          {
            withCredentials: true,
          }
        );
        setClassDetails(response.data.course);
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    fetchClassDetails();
  }, [id]);

  if (!classDetails) {
    return <div>Loading class details...</div>;
  }

  return (
    <div className="p-4 bg-[#f9f9f9]">
      <h1 className="text-4xl font-semibold"> {classDetails.title}</h1>
      <p className="text-lg text-gray-600">{classDetails.description}</p>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Announcements</h2>
        {classDetails.announcements && classDetails.announcements.length > 0 ? (
          classDetails.announcements.map((announcement: any) => {
            return (
              <div key={announcement} className="bg-white p-4 mt-2 rounded-md">
                <h3 className="text-xl font-semibold">{announcement}</h3>
              </div>
            );
          })
        ) : (
          <div className="text-lg font-medium text-gray-600 mt-2">
            No announcements yet
          </div>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Assignments</h2>
        {classDetails.assignments && classDetails.assignments.length > 0 ? (
          classDetails.assignments.map((assignment: any) => {
            return (
              <div
                key={assignment._id}
                className="bg-white p-4 mt-2 rounded-md flex justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold">
                    {assignment.name}
                    <small className="text-xs pl-4">
                      Created At:{" "}
                      {new Date(assignment.createdAt).toLocaleDateString(
                        "en-GB"
                      )}
                    </small>
                    <small className="text-xs pl-4">
                      Due At:
                      {new Date(assignment.dueDate).toLocaleDateString("en-GB")}
                    </small>
                  </h3>
                  <p className="text-gray-600">{assignment.description}</p>
                </div>
                <DialogDemo id={assignment._id}/>
              </div>
            );
          })
        ) : (
          <div className="text-lg font-medium text-gray-600 mt-2">
            No assignments yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Class;

function DialogDemo({ id }: any) {
  async function handleClick() {
    const commentInput = (document.getElementById("comment") as HTMLInputElement).value;
    const fileInput = (document.getElementById("file-upload") as HTMLInputElement).files?.[0];

    const formData = new FormData();
    formData.append("comment", commentInput);
    if (fileInput) {
      formData.append("file", fileInput);
    }

    try {
      await axios.post(
        `http://localhost:3000/course/addSubmission/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast({
        title: "Success",
        variant: "default",
        description: "Submission added successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.response?.data?.message || "An error occurred",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Submission</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit!</DialogTitle>
          <DialogDescription>
            Submit your assignment!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="comment"
              className="col-span-4 h-20 row-span-2"
              placeholder="Add a comment or description"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="file-upload" className="col-span-1">
              Upload File
            </label>
            <Input
              type="file"
              id="file-upload"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleClick}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


