import React from "react";
import {
  Navbar,
  Typography,
} from "@material-tailwind/react";
 
function NavList() {
  return (
    <ul className="my-2 flex flex-row gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
          Settings
        </a>
      </Typography>
    </ul>
  );
}
 
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
