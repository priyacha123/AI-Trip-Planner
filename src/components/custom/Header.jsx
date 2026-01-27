import logo from "/logo.png";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // const navigate = useNavigate()
  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        },
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
    <div className="p-3 mb-10 shadow-sm flex justify-between items-center px-5">
      <div className="flex justify-center items-center font-bold text-2xl">
        <img src={logo} alt="Voyage Tour" width={120} height={100} />
        <span>Voyage Tour</span>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button className="rounded-full border">Create Trips</Button>
            </a>
            <a href="/my-trips">
              <Button className="rounded-full border">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-9 w-9 rounded-full"
                  alt=""
                />
              </PopoverTrigger>
              <PopoverContent className="mt-4 mr-4 bg-transparent border-2 text-white">
                <h2
                  className="cursor-pointer text-lg"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
     <Dialog open={openDialog}>
  <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-xl">
    <DialogHeader className="space-y-3 text-center">
      <DialogTitle className="text-xl font-bold bg-linear-to-r from-indigo-400 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        Sign in with Google
      </DialogTitle>

      <DialogDescription className="text-sm text-gray-700">
        Securely sign in to access your account and continue using the app.
      </DialogDescription>
    </DialogHeader>

    <Button
      onClick={login}
      className="w-full mt-4 flex items-center justify-center gap-3 rounded-xl py-6 text-base font-semibold
                 bg-white text-gray-800 shadow-md border
                 hover:bg-gray-100 focus:ring-2 focus:ring-offset-1 focus:ring-gray-300"
    >
      <FcGoogle className="w-7 h-7" />
      Continue with Google
    </Button>

    <p className="mt-4 text-xs text-center text-gray-500">
      🔒 We don’t store your personal data.
    </p>
  </DialogContent>
</Dialog>

    </div>
  );
};

export default Header;
