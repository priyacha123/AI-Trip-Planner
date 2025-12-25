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
    axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload()
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <div className="flex justify-center items-center font-bold text-2xl">
        <img src={logo} alt="AI-Trip-Planner" width={120} height={100} />
        <span>AI-Trip-Planner</span>
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
            <img src={user?.picture} className="h-9 w-9 rounded-full" alt="" />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={() => {
                  googleLogout();
                  localStorage.clear()
                  window.location.reload()
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
          onClick={()=>setOpenDialog(true)}
          >Sign In</Button>
        )}
      </div>
            <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.png" />
              <h2 className="font-bold text-lg mt-5">Sign in with Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle className="w-7 h-7" />
                  Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
