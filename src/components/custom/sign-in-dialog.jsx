import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { Lock } from "lucide-react";
import axios from "axios";


const SignInDialog= ( { openDialog, setOpenDialog } ) => {

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
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-card shadow-xl">
          <DialogHeader className="space-y-3 text-center">
            <DialogTitle className="text-xl font-bold text-foreground">
              Welcome to{" "}
              <span className="text-primary">Voyara</span>
            </DialogTitle>

            <DialogDescription className="text-sm text-muted-foreground">
              Securely sign in to access your account and continue using the app.
            </DialogDescription>
          </DialogHeader>

          <Button
            onClick={login}
            className="w-full mt-4 flex items-center justify-center gap-3 rounded-full py-6 text-base font-semibold
                       bg-white text-gray-800 shadow-sm border
                       hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
          >
            <FcGoogle className="w-7 h-7" />
            Continue with Google
          </Button>

          <p className="mt-4 text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
            <Lock className="h-3.5 w-3.5 shrink-0" />
            We don’t store your personal data.
          </p>
        </DialogContent>
      </Dialog>
  )
}

export default SignInDialog