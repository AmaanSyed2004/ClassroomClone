import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

interface ClassCardProps {
  Title: string;
  Description: string;
  Teacher: string;
}

export default function ClassCard({ Title, Description, Teacher }: ClassCardProps) {
  return (
    <>
      <Card className="w-1/4 bg-[#eeeeee] ">
        <CardHeader>
          <CardTitle>{Title}</CardTitle>
          <CardDescription>{Teacher}</CardDescription>
        </CardHeader>
        <CardContent>{Description}</CardContent>
        <CardFooter>
          <Button variant="outline" size="default">
            View Class
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
