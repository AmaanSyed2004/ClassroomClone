import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
        console.log(response.data);
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
              <div
                key={announcement}
                className="bg-white p-4 mt-2 rounded-md"
              >
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
        { classDetails.assignments &&classDetails.assignments.length > 0 ? (
          classDetails.assignments.map((assignment: any) => {
            return (
              <div
                key={assignment._id}
                className="bg-white p-4 mt-2 rounded-md"
              >
                <h3 className="text-xl font-semibold">{assignment.name}</h3>
                <p className="text-gray-600">{assignment.description}</p>
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
