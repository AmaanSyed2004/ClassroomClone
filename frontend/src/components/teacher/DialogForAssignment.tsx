import { useState } from "react";
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

function DialogForAssignment({ id }: any) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [maxMarks, setMaxMarks] = useState("");

  async function handleClick() {
    try {
      await axios.post(
        `http://localhost:3000/course/createAssignment`,
        {
          courseID:id,
          name,
          description,
          dueDate,
          maxMarks: parseInt(maxMarks), // Convert to number
        },
        { withCredentials: true }
      );
      toast({
        title: "Success",
        variant: "default",
        description: "Assignment added successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.response?.message || "An error occurred",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Assignment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Assignment</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new assignment.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Assignment Name"
              className="col-span-4"
            />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Assignment Description"
              className="col-span-4"
            />
            <Input
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="Due Date (YYYY-MM-DD)"
              type="date"
              className="col-span-4"
            />
            <Input
              value={maxMarks}
              onChange={(e) => setMaxMarks(e.target.value)}
              placeholder="Max Marks"
              type="number"
              className="col-span-4"
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

export default DialogForAssignment;
