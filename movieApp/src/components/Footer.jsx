import { Typography } from "@material-tailwind/react";
import { LuPopcorn } from "react-icons/lu";

 
export function Footer() {
  return (
    <footer className="flex w-full justify-center gap-y-6 gap-x-12 border-t border-gray-700 py-6  text-center">
      <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 flex flex-row-reverse text-md mx-10 "
        >
            MovieApp      
          <LuPopcorn className="text-blue-500" size={20}/> 
        </Typography>
    </footer>
  );
}

export default Footer