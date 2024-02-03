import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { LuPopcorn } from "react-icons/lu";
import { Link } from "react-router-dom";

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 border-none">
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link to="/" className="flex items-center hover:text-blue-500 transition-colors">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link to="/LatestReleasesMovies" className="flex items-center hover:text-blue-500 transition-colors">
          Últimos lanzamientos
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link to="/PopularMovies" className="flex items-center hover:text-blue-500 transition-colors">
          Populares
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="white"
        className="p-1 font-medium"
      >
        <Link to="/FavoritesMovies" className="flex items-center hover:text-blue-500 transition-colors">
          Favoritos
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="gray"
        className="p-1 font-medium"
      >
        <Link to="/SearchMovie" className="flex items-center hover:text-blue-500 transition-colors">
          Buscar
        </Link>
      </Typography>
    </ul>
  );
}

export function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="w-full px-6 py-3 bg-black border-none">
      <div className="flex items-center justify-between text-white-900">
        <Typography
          as={Link}
          to="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 flex flex-row-reverse text-3xl mx-5 "
        >
          MovieApp
          <LuPopcorn className="text-blue-500" size={30} />
        </Typography>

        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}

