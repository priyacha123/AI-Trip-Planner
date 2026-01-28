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
        <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-xl">
          <DialogHeader className="space-y-3 text-center">
            <DialogTitle className="text-xl font-bold bg-linear-to-r from-indigo-300 via-purple-700 to-pink-600 bg-clip-text text-transparent">
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
  )
}

export default SignInDialog