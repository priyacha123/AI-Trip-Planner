import LocationAutocomplete from "../components/custom/LocationAutoComplete";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { SelectBudgetOptions, SelectTravelsList } from "../constants/options";
import { useState } from "react";
import { toast } from "sonner";
import { AI_PROMPT, generateTripStream } from "../service/AiModal";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SignInDialog from "../components/custom/sign-in-dialog";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) return setOpenDialog(true);

    if (
      formData?.total_days > 30 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveller ||
      formData.total_days < 1 ||
      formData.total_days > 30
    ) {
      toast.warning("Please enter correct details");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label,
    )
      .replace("{total_days}", formData?.total_days)
      .replace("{traveller}", formData?.traveller)
      .replace("{budget}", formData?.budget);

    try {
      const result = await generateTripStream(FINAL_PROMPT);
      SaveAITrip(result);
    } catch {
      toast.error("Failed to generate trip");
      setLoading(false);
    }
  };

  const extractJSON = (text) =>
    text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

  const SaveAITrip = async (TripData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();
      const parsedTrip = JSON.parse(extractJSON(TripData));

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedTrip,
        userEmail: user?.email,
        id: docId,
      });

      navigate("/view-trip/" + docId);
    } catch {
      toast.error("AI response format error");
      setLoading(false);
    }
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <>
      <div
        className="min-h-screen bg-gradient-to-br
        from-[#f6efe7] via-[#efe3d3] to-[#e6d3bf]
        dark:from-[#6e996b] dark:via-[#1f130b] dark:to-[#016751]
        transition-colors"
      >
        <div className="px-4 sm:px-8 md:px-20 lg:px-40 xl:px-56 py-10">
          <div
            className="
            bg-white/80
            dark:bg-[#a1a081b2]/80
            backdrop-blur-xl
            rounded-3xl
            border border-[#e4d5c5]
            dark:border-[#0c362eb2]
            shadow-2xl
            p-6 sm:p-10"
          >
            <div className="flex flex-col justify-between items-center gap-2">
              <h2 className="sm:text-3xl text-wrap md:text-4xl font-extrabold text-[#5b3a29] dark:text-[#f5e6d8]">
                Plan Your Perfect Trip ☕✈️
              </h2>
              <p className="mt-1 text-sm sm:text-lg text-[#7a5a44] dark:text-[#391c03]">
                AI-powered itinerary crafted just for you
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-12">
              <div>
                <h2 className="text-lg font-semibold mb-2 text-[#4b2e1f] dark:text-[#f5e6d8]">
                  🌍 Destination
                </h2>
                <LocationAutocomplete
                  selectProps={{
                    place,
                    onChange: (v) => {
                      setPlace(v);
                      handleInputChange("location", v);
                    },
                  }}
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2 text-[#4b2e1f] dark:text-[#f5e6d8]">
                  🗓️ Total Days
                </h2>
                <Input
                  type="number"
                  placeholder="Eg. 2"
                  className="w-full p-5 rounded-xl border-2 border-[#d6c2ae] dark:border-[#7a846f]
                  dark:bg-[#3a4039] dark:text-[#f5e6d8]"
                  onChange={(e) =>
                    handleInputChange("total_days", e.target.value)
                  }
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#4b2e1f] dark:text-[#f5e6d8]">
                  💰 Budget
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {SelectBudgetOptions.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleInputChange("budget", item.title)}
                      className={`p-5 rounded-2xl cursor-pointer transition-all
                      ${
                        formData?.budget === item.title
                          ? "bg-gradient-to-br from-[#ede0d4] to-[#dbc1ac] dark:from-[#9f701e] dark:to-[#9a8b6a] border-2 border-[#8b5a3c] shadow-xl"
                          : "bg-white/80 dark:bg-[#3a4039] border border-[#e1cfc0] dark:border-[#6f7a66]"
                      }`}
                    >
                      <div className="flex gap-3 items-center">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h3 className="font-semibold text-[#4b2e1f] dark:text-[#f5e6d8]">
                            {item.title}
                          </h3>
                          <p className="text-sm text-[#7a5a44] dark:text-[#e6cbb5] text-wrap">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4 text-[#4b2e1f] dark:text-[#f5e6d8]">
                  🧳 Travellers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {SelectTravelsList.map((item, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        handleInputChange("traveller", item.people)
                      }
                      className={`p-5 rounded-2xl cursor-pointer transition-all
                      ${
                        formData?.traveller === item.people
                          ? "bg-gradient-to-br from-[#ede0d4] to-[#dbc1ac] dark:from-[#9f701e] dark:to-[#9a8b6a] border-2 border-[#8b5a3c] shadow-xl"
                          : "bg-white/80 dark:bg-[#3a4039] border border-[#e1cfc0] dark:border-[#6f7a66]"
                      }`}
                    >
                      <div className="flex gap-3 items-center">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h3 className="font-semibold text-[#4b2e1f] dark:text-[#f5e6d8]">
                            {item.title}
                          </h3>
                          <p className="text-sm text-[#7a5a44] dark:text-[#e6cbb5] text-wrap">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-14 flex justify-end">
              <Button
                disabled={loading}
                onClick={OnGenerateTrip}
                className="px-10 py-6 rounded-2xl text-lg font-semibold
                bg-gradient-to-r from-[#8b5a3c] to-[#6f3f2a]
                dark:from-[#c6b089] dark:to-[#9a8b6a]
                text-white dark:text-[#2b251d]
                shadow-xl hover:opacity-90"
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                ) : (
                  "✨ Generate My Trip"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SignInDialog
        login={login}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
};

export default CreateTrip;
