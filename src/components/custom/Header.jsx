import logo from "/logo.png";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { googleLogout } from "@react-oauth/google";
import { Link } from "react-router-dom";
import SignInDialog from "./sign-in-dialog";

const Header = () => {
      const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full text-black  bg-white/70 backdrop-blur-lg border-b">
        <div className="flex items-center justify-between px-4 py-3 md:px-8 max-w-full">

          <Link to="/" className="flex items-center gap-2 min-w-0">
            <img
              src={logo}
              alt="Voyage Tour"
              className="w-9 h-9 md:w-11 md:h-11 shrink-0"
            />
            <span className="text-lg md:text-2xl font-bold tracking-tight truncate">
              Voyage <span className="text-primary">Tour</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4 max-w-full overflow-hidden">
            {user ? (
              <>
                <Link to="/create-trip">
                  <Button
                    variant="outline"
                    className="px-2 md:px-5 min-w-0 rounded-full"
                  >
                    <span className="hidden md:inline">Create Trip</span>
                    <span className="md:hidden">➕</span>
                  </Button>
                </Link>

                <Link to="/my-trips">
                  <Button
                    variant="outline"
                    className="px-2 md:px-5 min-w-0 rounded-full"
                  >
                    <span className="hidden md:inline">My Trips</span>
                    <span className="md:hidden">🌍</span>
                  </Button>
                </Link>

                <Popover>
                  <PopoverTrigger>
                    <img
                      src={user.picture}
                      className="h-8 w-8 md:h-9 md:w-9 rounded-full ring-2 ring-primary cursor-pointer shrink-0"
                      alt="profile"
                    />
                  </PopoverTrigger>

                  <PopoverContent
                    align="end"
                    sideOffset={8}
                    className="w-24 max-w-[90vw] text-center"
                  >
                    <button
                      onClick={() => {
                        googleLogout();
                        localStorage.clear();
                        window.location.reload();
                      }}
                      className="w-full text-sm hover:text-primary"
                    >
                      Logout
                    </button>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <Button
                onClick={() => setOpenDialog(true)}
                className="rounded-full text-sm md:text-base px-3 md:px-5"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

<SignInDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
};

export default Header;
