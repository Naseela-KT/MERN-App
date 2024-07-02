/* eslint-disable react/no-unknown-property */
import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import { adminLogout } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
 
export function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);
  const dispatch = useDispatch();
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const handleLogout = () => {
    dispatch(adminLogout());
    toast.success("Logged Out Successfully");
  };

  const location=useLocation()
 

  if (location.pathname === "/login") {
    return null; // Return null if the location pathname is "/"
  }
  return (
   
    <Navbar className="fixed top-0 w-full z-10 bg-[#01071E] px-4 py-2 lg:px-8 lg:py-4 rounded-none">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/">
        <Typography
          color="white"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
        Home
        </Typography>
        </Link>
        <div className="flex items-center gap-x-1">
       
          <Button
          color="white"
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
            onClick={handleLogout}
          >
            <span>Logout</span>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
       
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign in</span>
            </Button>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  )
}