import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  
  interface ClassCardProps {
    Title: string;
    Description: string;
    Teacher: string;
    id:string;
  }
  
  export default function ClassCard({ Title, Description, Teacher, id }: ClassCardProps) {
      function handleClick(){
          window.location.href=`/HomePage/course/${id}`;
      }
    return (
      <>
        <Card className="w-[400px] min-h-[300px] bg-[#eeeeee] ">
          <CardHeader>
            <CardTitle>{Title}</CardTitle>
            <CardDescription>{Teacher}</CardDescription>
          </CardHeader>
          <CardContent>{Description}</CardContent>
          <CardFooter>
            <Button variant="outline" size="default" onClick={handleClick}>
              View Class
            </Button>
          </CardFooter>
        </Card>
      </>
    );
  }
  