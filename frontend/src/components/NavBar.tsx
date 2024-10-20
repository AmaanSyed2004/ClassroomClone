import { Link } from "react-router-dom"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { SVGProps } from "react"
import { JSX } from "react/jsx-runtime"

export default function NavBar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#eeeeee] h-20 ">
      <Link to="#" className="flex items-center gap-2" >
        <MountainIcon className="h-6 w-6" />
        <span className="text-3xl font-semibold">ClassBridge</span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid w-[200px] p-4">
            <Link to="#" className="text-xl font-medium hover:underline underline-offset-4" >
              Home
            </Link>
            <Link to="#" className="text-xl font-medium hover:underline underline-offset-4" >
              About
            </Link>
            <Link to="#" className="text-xl font-medium hover:underline underline-offset-4" >
              Services
            </Link>
            <Link to="#" className="text-xl font-medium hover:underline underline-offset-4" >
              Portfolio
            </Link>
            <Link to="#" className="text-xl font-medium hover:underline underline-offset-4" >
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    )
  }

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}