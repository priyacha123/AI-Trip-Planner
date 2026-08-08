import LocationAutocomplete from "../components/custom/LocationAutoComplete";
import { Button } from "../components/ui/button";
import { SelectBudgetOptions, SelectTravelsList } from "../constants/options";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AI_PROMPT, generateTripStream } from "../service/AiModal";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SignInDialog from "../components/custom/sign-in-dialog";
import {
  MapPin,
  CalendarDays,
  Wallet,
  Users,
  Sparkles,
  ArrowLeft,
  Send,
  MessageSquare,
  Mountain,
  Palmtree,
  Landmark,
  Utensils,
  ChevronRight,
} from "lucide-react";
import { StatPill, StatPillRow } from "../components/custom/StatPill";
import { getPlacePhoto } from "../service/UnsplashApi";
import { FALLBACK_IMAGE } from "../constants/images";

const TRIP_STYLES = [
  { id: "adventure", title: "Adventure", icon: Mountain, tint: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  { id: "relaxation", title: "Relaxation", icon: Palmtree, tint: "bg-teal-500/10 text-teal-600 dark:text-teal-400" },
  { id: "culture", title: "Culture", icon: Landmark, tint: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  { id: "food", title: "Food", icon: Utensils, tint: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
];

const STEPS = [
  { id: "destination", label: "Destination", icon: MapPin },
  { id: "duration", label: "Duration", icon: CalendarDays },
  { id: "budget", label: "Budget", icon: Wallet },
  { id: "travellers", label: "Travellers", icon: Users },
  { id: "style", label: "Style", icon: Sparkles },
  { id: "review", label: "Review", icon: Send },
];

const CreateTrip = () => {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({
    location: null,
    total_days: "",
    budget: "",
    traveller: "",
    tripStyle: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [previewImage, setPreviewImage] = useState(FALLBACK_IMAGE);
  const [aiInput, setAiInput] = useState("");
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    const fetchPreview = async () => {
      if (formData.location?.label) {
        const url = await getPlacePhoto(formData.location.label);
        if (url) setPreviewImage(url);
      }
    };
    fetchPreview();
  }, [formData.location]);

  const handleAiAssist = () => {
    if (!aiInput.trim()) return;
    const text = aiInput.toLowerCase();
    if (text.includes("paris")) handleInputChange("location", { label: "Paris, France", value: "paris" });
    if (text.includes("kyoto")) handleInputChange("location", { label: "Kyoto, Japan", value: "kyoto" });
    if (text.includes("bali")) handleInputChange("location", { label: "Bali, Indonesia", value: "bali" });
    if (text.includes("santorini")) handleInputChange("location", { label: "Santorini, Greece", value: "santorini" });
    if (text.includes("new york")) handleInputChange("location", { label: "New York, USA", value: "new-york" });
    if (text.match(/\d+/)) {
      const days = parseInt(text.match(/\d+/)[0]);
      if (days >= 1 && days <= 30) handleInputChange("total_days", days);
    }
    if (text.includes("budget") || text.includes("cheap") || text.includes("low")) handleInputChange("budget", "Budget Friendly");
    if (text.includes("economy")) handleInputChange("budget", "Economy");
    if (text.includes("standard") || text.includes("mid")) handleInputChange("budget", "Standard");
    if (text.includes("premium") || text.includes("luxury")) handleInputChange("budget", "Premium");
    if (text.includes("solo") || text.includes("alone")) handleInputChange("traveller", 1);
    if (text.includes("couple") || text.includes("romantic")) handleInputChange("traveller", 2);
    if (text.includes("family")) handleInputChange("traveller", 4);
    if (text.includes("friends")) handleInputChange("traveller", 5);
    if (text.includes("adventure")) handleInputChange("tripStyle", "adventure");
    if (text.includes("relax") || text.includes("beach")) handleInputChange("tripStyle", "relaxation");
    if (text.includes("culture") || text.includes("history")) handleInputChange("tripStyle", "culture");
    if (text.includes("food") || text.includes("culinary")) handleInputChange("tripStyle", "food");
    setAiInput("");
    toast.success("Form pre-filled from your description!");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.location;
      case 1: return formData.total_days && formData.total_days >= 1 && formData.total_days <= 30;
      case 2: return formData.budget;
      case 3: return formData.traveller;
      case 4: return formData.tripStyle;
      default: return true;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const OnGenerateTrip = async () => {
    if (!user) return setOpenDialog(true);
    if (!formData.location) return toast.warning("Please select a destination");
    if (!formData.total_days || formData.total_days < 1 || formData.total_days > 30) return toast.warning("Please enter valid days (1-30)");
    if (!formData.budget) return toast.warning("Please select a budget");
    if (!formData.traveller) return toast.warning("Please select travellers");

    setLoading(true);
    try {
      const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.location.label)
        .replace("{total_days}", formData.total_days)
        .replace("{traveller}", formData.traveller)
        .replace("{budget}", formData.budget)
        .replace("{userEmail}", user?.email ?? "");

      const result = await generateTripStream(FINAL_PROMPT);
      await SaveAITrip(result);
    } catch (error) {
      toast.error("Failed to generate trip: " + error.message);
      setLoading(false);
    }
  };

  const extractJSON = (text) =>
    text.replace(/```json/g, "").replace(/```/g, "").trim();

  const SaveAITrip = async (TripData) => {
    try {
      const docId = Date.now().toString();
      const parsedTrip = JSON.parse(extractJSON(TripData));

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedTrip,
        userEmail: user?.email,
        id: docId,
      });

      navigate(`/view-trip/${docId}`);
    } catch (error) {
      toast.error("AI response format error: " + error.message);
      setLoading(false);
    }
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`)
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);
        setOpenDialog(false);
        OnGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to fetch user profile");
        setLoading(false);
      });
  };

  const selectionCardClass = (selected) =>
    `flex flex-col items-start gap-2.5 p-4 rounded-2xl text-left transition-all ${
      selected
        ? "bg-primary/10 border-2 border-primary ring-1 ring-primary/40"
        : "bg-card border border-muted hover:border-primary/40"
    }`;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-foreground mb-1">Where to?</h3>
            <p className="text-sm text-muted-foreground mb-6">Search for your dream destination</p>
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
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-foreground mb-1">How long?</h3>
            <p className="text-sm text-muted-foreground mb-6">Number of days for your trip</p>
            <div className="relative">
              <input
                type="number"
                placeholder="Eg. 5"
                className="w-full p-5 rounded-2xl text-foreground border-2 border-input bg-background placeholder-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-lg"
                value={formData.total_days || ""}
                onChange={(e) =>
                  handleInputChange("total_days", e.target.value === "" ? "" : Number(e.target.value))
                }
                min="1"
                max="30"
              />
              <CalendarDays className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {[3, 5, 7, 10, 14].map((d) => (
                <button
                  key={d}
                  onClick={() => handleInputChange("total_days", d)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.total_days === d
                      ? "bg-primary/10 border-2 border-primary text-primary"
                      : "bg-card border border-muted text-foreground hover:border-primary/40"
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-foreground mb-1">Your budget?</h3>
            <p className="text-sm text-muted-foreground mb-6">Pick a comfort level</p>
            <div className="grid grid-cols-2 gap-3">
              {SelectBudgetOptions.map((item) => {
                const selected = formData.budget === item.title;
                return (
                  <button
                    key={item.title}
                    onClick={() => handleInputChange("budget", item.title)}
                    className={selectionCardClass(selected)}
                  >
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selected
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-foreground">{item.title}</span>
                    <span className="text-[11px] leading-snug text-muted-foreground">
                      {item.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-foreground mb-1">Who&apos;s coming?</h3>
            <p className="text-sm text-muted-foreground mb-6">Number of travelers</p>
            <div className="grid grid-cols-2 gap-3">
              {SelectTravelsList.map((item) => {
                const selected = formData.traveller === item.people;
                return (
                  <button
                    key={item.title}
                    onClick={() => handleInputChange("traveller", item.people)}
                    className={selectionCardClass(selected)}
                  >
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selected
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-foreground">{item.title}</span>
                    <span className="text-[11px] leading-snug text-muted-foreground">
                      {item.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-foreground mb-1">Trip style?</h3>
            <p className="text-sm text-muted-foreground mb-6">What kind of experience do you want?</p>
            <div className="grid grid-cols-2 gap-3">
              {TRIP_STYLES.map((style) => {
                const selected = formData.tripStyle === style.id;
                return (
                  <button
                    key={style.id}
                    onClick={() => handleInputChange("tripStyle", style.id)}
                    className={`flex flex-col items-start gap-3 p-5 rounded-2xl text-left transition-all ${
                      selected
                        ? "bg-primary/5 border-2 border-primary ring-1 ring-primary/40"
                        : "bg-card border border-muted hover:border-primary/40"
                    }`}
                  >
                    <span className={`w-12 h-12 rounded-xl flex items-center justify-center ${style.tint}`}>
                      <style.icon className="h-6 w-6" />
                    </span>
                    <span className="text-sm font-medium text-foreground">{style.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-foreground mb-1">Review your trip</h3>
            <p className="text-sm text-muted-foreground mb-4">Confirm details before generating</p>
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Destination</p>
                  <p className="font-medium text-foreground">{formData.location?.label || "Not selected"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Duration</p>
                  <p className="font-medium text-foreground">{formData.total_days ? `${formData.total_days} days` : "Not set"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Budget</p>
                  <p className="font-medium text-foreground">{formData.budget || "Not selected"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Travellers</p>
                  <p className="font-medium text-foreground">{formData.traveller ? `${formData.traveller} people` : "Not selected"}</p>
                </div>
              </div>
            </div>
            <StatPillRow>
              {formData.total_days && <StatPill variant="light" icon={CalendarDays} label="Duration" value={`${formData.total_days}d`} />}
              {formData.budget && <StatPill variant="light" icon={Wallet} label="Budget" value={formData.budget} />}
              {formData.traveller && <StatPill variant="light" icon={Users} label="Travelers" value={formData.traveller} />}
            </StatPillRow>
          </div>
        );
      default:
        return null;
    }
  };

  const selectedChip = (text) => (
    <span className="text-[11px] font-medium text-white bg-white/15 border border-white/20 rounded-full px-2.5 py-1">
      {text}
    </span>
  );

  return (
    <>
      <div className="min-h-screen bg-background transition-colors">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Mobile preview band */}
          <div className="relative h-44 lg:hidden overflow-hidden bg-neutral-900 flex-shrink-0">
            <img
              src={previewImage}
              alt="Trip preview"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full p-4">
              {formData.location ? (
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 self-start">
                  <MapPin className="h-3.5 w-3.5 text-white" />
                  <span className="text-white text-sm font-medium">{formData.location.label}</span>
                </div>
              ) : (
                <span className="text-white/50 text-sm">Fill the form to preview your trip</span>
              )}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {formData.total_days && selectedChip(`${formData.total_days}d`)}
                {formData.budget && selectedChip(formData.budget)}
                {formData.traveller && selectedChip(`${formData.traveller} people`)}
                {formData.tripStyle && selectedChip(formData.tripStyle)}
              </div>
            </div>
          </div>

          {/* Left Preview Panel */}
          <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-neutral-900">
            <img
              src={previewImage}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 flex flex-col justify-end p-10 w-full">
              <div className="space-y-4">
                {formData.location && (
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                    <MapPin className="h-4 w-4 text-white" />
                    <span className="text-white text-sm font-medium">{formData.location.label}</span>
                  </div>
                )}

                {formData.total_days && (
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 max-w-xs">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                      <CalendarDays className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wider">Duration</p>
                      <p className="text-white font-medium">{formData.total_days} days</p>
                    </div>
                  </div>
                )}

                {formData.traveller && (
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 max-w-xs">
                    <div className="flex -space-x-2">
                      {Array.from({ length: Math.min(formData.traveller, 5) }).map((_, i) => (
                        <div key={i} className="h-8 w-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs text-white font-medium">
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wider">Travelers</p>
                      <p className="text-white font-medium">{formData.traveller} people</p>
                    </div>
                  </div>
                )}

                {formData.budget && (
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 max-w-xs">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Wallet className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wider">Budget</p>
                      <p className="text-white font-medium">{formData.budget}</p>
                    </div>
                  </div>
                )}

                {formData.tripStyle && (
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 max-w-xs">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                      {formData.tripStyle === "adventure" && <Mountain className="h-5 w-5 text-white" />}
                      {formData.tripStyle === "relaxation" && <Palmtree className="h-5 w-5 text-white" />}
                      {formData.tripStyle === "culture" && <Landmark className="h-5 w-5 text-white" />}
                      {formData.tripStyle === "food" && <Utensils className="h-5 w-5 text-white" />}
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wider">Style</p>
                      <p className="text-white font-medium capitalize">{formData.tripStyle}</p>
                    </div>
                  </div>
                )}

                {!formData.location && (
                  <div className="text-white/40 text-sm">Fill in the form to see your trip preview</div>
                )}
              </div>
            </div>
          </div>

          {/* Right Input Rail */}
          <div className="w-full lg:w-2/5 bg-card lg:border-l border-border flex flex-col">
            {/* AI Assist Strip */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Describe your dream trip..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAiAssist()}
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-background border border-input text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  onClick={handleAiAssist}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Step Progress */}
            <div className="px-6 pt-6 pb-2">
              <div className="flex items-center justify-between mb-4">
                {STEPS.slice(0, -1).map((step, index) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentStep(index)}
                      aria-label={step.label}
                      className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                        currentStep === index
                          ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                          : index < currentStep
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <step.icon className="h-4 w-4" />
                    </button>
                    {index < STEPS.length - 2 && (
                      <div className={`h-px w-6 md:w-10 ${index < currentStep ? "bg-primary" : "bg-muted"}`} />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Step {currentStep + 1} of {STEPS.length - 1}
              </p>
            </div>

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="p-6 border-t border-border flex items-center justify-between gap-3">
              {currentStep > 0 ? (
                <button
                  onClick={handlePrev}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border border-border hover:bg-accent transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < STEPS.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all ml-auto"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <Button
                  disabled={loading}
                  onClick={OnGenerateTrip}
                  className="ml-auto rounded-full px-8 py-3 text-sm font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate My Trip
                    </>
                  )}
                </Button>
              )}
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
