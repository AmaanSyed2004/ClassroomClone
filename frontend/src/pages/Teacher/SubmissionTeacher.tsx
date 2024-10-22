import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"; // Assuming you have a custom Button component
import { toast } from "@/hooks/use-toast";

const SubmissionTeacher = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await axios.get("http://localhost:3000/course/submissions", { withCredentials: true });
        setSubmissions(response.data);
        console.log(response.data)
      } catch (error: any) {
        toast({
          title: "Error",
          variant: "destructive",
          description: error.response?.data?.message || "Failed to fetch submissions",
        });
      }
    }

    fetchSubmissions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Submissions for this course</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Assignment</th>
              <th className="px-4 py-2 text-left">Student</th>
              <th className="px-4 py-2 text-left">Marks</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Files</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission:any) => (
              <tr key={submission._id} className="border-t">
                <td className="px-4 py-2">{submission.assignmentID?.name || "N/A"}</td>
                <td className="px-4 py-2">{submission.studentID?.name || "N/A"}</td>
                <td className="px-4 py-2">{submission.marks}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full ${submission.status === 'graded' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {submission.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {submission.files.length > 0 ? (
                    submission.files.map((file:any, index:any) => (
                      <a
                        href={`http://localhost:3000/uploads/${file}`}
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {file}
                      </a>
                    ))
                  ) : (
                    <span>No Files</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <Button variant="outline" className="mr-2">Grade</Button>
                  <Button variant="destructive">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionTeacher;
