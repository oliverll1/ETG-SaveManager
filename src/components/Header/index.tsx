import {
  Navbar,
  Typography,
} from "@material-tailwind/react";
 
 
export function Header() {
  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3 rounded-none">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          ETG Save Manager
        </Typography>  
        
      </div>
    </Navbar>
  );
}
