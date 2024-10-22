import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import DialogForAssignment from "@/components/teacher/DialogForAssignment";

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

const ClassTeacher: React.FC = () => {
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
        console.log(response.data.course.assignments);
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
  function handleClick(){
    window.location.href=`http://localhost:5173/HomePage/course/${id}/submissions`
  }

  return (
    <div className="p-4 bg-[#f9f9f9]">
      <h1 className="text-4xl font-semibold"> {classDetails.title}</h1>
      <p className="text-lg text-gray-600">{classDetails.description}</p>
      <p className="text-md text-gray-600">Course ID:{classDetails.courseID}</p>
      <div className="mt-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Announcements</h2>
          <DialogDemo id={id} />
        </div>
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
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Assignments</h2>
          <DialogForAssignment id={id} />
        </div>
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
                      {new Date(assignment.dueDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </small>
                  </h3>
                  <p className="text-gray-600">{assignment.description}</p>
                </div>
                <Button variant={"outline"} onClick={handleClick}>View Submissions</Button>
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
interface DialogDemoProps {
  id: string | undefined;
}

function DialogDemo({ id }: DialogDemoProps) {
  const [announcement, setAnnouncement] = useState("");
  async function handleClick() {
    try {
      await axios.post(
        `http://localhost:3000/course/addAnnouncement/${id}`,
        { announcement },
        { withCredentials: true }
      );
      toast({
        title: "Success",
        variant: "default",
        description: "Announcement added successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.response.message,
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Announcement</DialogTitle>
          <DialogDescription>
            Announce something to the class!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              id="name"
              className="col-span-4 h-20 row-span-2"
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
export default ClassTeacher;
