import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate= useNavigate();
    function handleClick(){
        navigate("/auth");
    }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-5xl w-full px-6 py-16">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to ClassBridge</h1>
          <p className="text-lg text-gray-600">
            The ultimate platform for teachers and students to connect, collaborate, and learn efficiently.
          </p>
        </header>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Create and Manage Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Teachers can easily create classrooms, invite students, and manage assignments.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Collaborate with Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Collaborate in real-time with students on projects, assignments, and discussions.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Monitor student submissions, provide feedback, and keep track of their progress effortlessly.</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button variant="default" size="lg" onClick={handleClick}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
