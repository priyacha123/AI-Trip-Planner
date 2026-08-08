import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { googleLogout } from "@react-oauth/google";
import SignInDialog from "./sign-in-dialog";
import { ModeToggle } from "../ui/mode-toggle";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
];

export default function Navbar() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <nav className="sticky top-0 z-50 h-[60px] flex items-center justify-between px-6 md:px-10 bg-background/90 backdrop-blur border-b">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 no-underline">
          <div className="w-[28px] h-[28px] flex items-center justify-center border-[1.5px] border-primary rounded-[6px]">
            <svg
              viewBox="0 0 24 24"
              className="w-[13px] h-[13px] fill-none stroke-primary"
              strokeWidth={1.8}
            >
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
            </svg>
          </div>
          <span className="text-[15px] font-medium text-foreground tracking-tight">
            JOURNI
          </span>
        </a>

        {/* Center links */}
        <ul className="hidden md:flex items-center gap-7 list-none">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-sm text-muted-foreground no-underline hover:text-foreground transition-colors duration-150"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-2.5">
          <ModeToggle />

          {user ? (
            <>
              <Link to="/create-trip">
                <Button
                  variant="outline"
                  className="hidden sm:inline-flex text-sm px-[16px] rounded-full"
                >
                  Create Trip
                </Button>
              </Link>

              <Popover>
                <PopoverTrigger>
                  <img
                    src={user.picture}
                    className="h-8 w-8 rounded-full ring-2 ring-primary cursor-pointer"
                    alt="profile"
                  />
                </PopoverTrigger>

                <PopoverContent
                  align="end"
                  sideOffset={8}
                  className="w-48 text-sm"
                >
                  <div className="px-1 pb-2 mb-1 border-b border text-muted-foreground truncate">
                    {user.email}
                  </div>

                  <button
                    onClick={() => {
                      googleLogout();
                      localStorage.removeItem("user");
                      window.location.reload();
                    }}
                    className="w-full text-left px-1 py-1.5 rounded-md hover:bg-muted text-foreground cursor-pointer"
                  >
                    Logout
                  </button>
                </PopoverContent>
              </Popover>
            </>) : (
            <>
              <Button
                variant="ghost"
                onClick={() => setOpenDialog(true)}
                className="text-sm rounded-full"
              >
                Sign in
              </Button>

              <Link to="/create-trip">
                <Button className="text-sm font-medium rounded-full px-[18px]">
                  Get started
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <SignInDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
}