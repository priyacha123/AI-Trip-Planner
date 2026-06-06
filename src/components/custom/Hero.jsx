import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import DestinationMarquee from "./DestinationMarquee";
import Stats from "./Stats";
import HowItWorks from "./HowItWorks";
import Features from "./Features";
import Contact from "./Contact";
import Footer from "./Footer";

const SIDEBAR_TRIPS = ["Paris, France", "Kyoto, Japan", "Bali, Indonesia"];
const SIDEBAR_SETTINGS = ["Account", "Preferences"];

const DAYS = [
  {
    day: "Day 1",
    theme: "Arrival & Montmartre",
    places: [
      {
        name: "Sacré-Cœur Basilica",
        meta: "35 Rue du Chevalier de la Barre · Free",
        time: "10:00 AM · 1.5h",
      },
      {
        name: "Place du Tertre",
        meta: "Place du Tertre, Montmartre · Free",
        time: "12:00 PM · 1h",
      },
    ],
  },
  {
    day: "Day 2",
    theme: "Louvre & Tuileries",
    places: [
      {
        name: "Musée du Louvre",
        meta: "Rue de Rivoli · €17 per person",
        time: "9:00 AM · 3h",
      },
      {
        name: "Jardin des Tuileries",
        meta: "113 Rue de Rivoli · Free",
        time: "1:00 PM · 1h",
      },
    ],
  },
];

export default function Hero() {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleViewTrips = () => {
    if (!user) {
      setOpenDialog(true);
    } else {
      navigate("/my-trips");
    }
  };

  return (
    <section className="mx-auto px-10 pt-20 pb-16">
      {/* Eyebrow tag */}
      {/* <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-medium tracking-wide px-3 py-[5px] rounded-full mb-7 border border-emerald-200">
        <span className="w-[5px] h-[5px] bg-emerald-700 rounded-full" />
        Powered by AI
      </div> */}

      {/* Headline */}
      <h1 className="font-serif text-[58px] font-normal leading-[1.1] text-stone-900 mb-5 tracking-tight max-w-xl">
        Plan any trip,
        <br />
        <i className="text-stone-400">in a few seconds.</i>
      </h1>

      {/* Subheading */}
      <p className="text-base font-light text-stone-500 leading-[1.75] max-w-md mb-9">
        Tell Voyara where you want to go. Get a full day-by-day itinerary with
        hotels, places, timings, and map coordinates — no research required.
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3 mb-14">
        <Link to={"/create-trip"}>
          <Button className="text-sm font-medium text-stone-50 bg-stone-900 px-6 py-[10px] rounded-lg no-underline hover:bg-stone-800 transition-colors duration-150">
            Start planning free
          </Button>
        </Link>

        <a
          href="#how-it-works"
          className="text-sm text-stone-500 px-5 py-[10px] rounded-lg border border-stone-200 no-underline hover:bg-stone-100 hover:text-stone-900 transition-colors duration-150"
        >
          See how it works
        </a>
      </div>

      {/* App preview mockup */}
      <div className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
        {/* Browser chrome */}
        <div className="flex items-center gap-2.5 px-4 py-3 bg-stone-100 border-b border-stone-200">
          <div className="flex gap-1.5">
            <div className="w-[9px] h-[9px] rounded-full bg-stone-300" />
            <div className="w-[9px] h-[9px] rounded-full bg-stone-300" />
            <div className="w-[9px] h-[9px] rounded-full bg-stone-300" />
          </div>

          <div className="flex-1 bg-stone-50 border border-stone-200 rounded px-3 py-1 text-xs text-stone-400 font-sans">
            voyara.app/trip/paris-7d
          </div>
        </div>

        {/* Content area */}
        <div className="flex min-h-[300px]">
          {/* Sidebar */}
          <div className="hidden md:flex w-52 border-r border-stone-200 p-4 flex-col gap-[3px] shrink-0">
            <p className="text-[10px] font-medium text-stone-400 tracking-[0.08em] uppercase mb-2">
              My trips
            </p>

            {SIDEBAR_TRIPS.map((trip, i) => (
              <div
                key={trip}
                className={`px-2.5 py-1.5 rounded-md text-[13px] cursor-pointer ${i === 0
                    ? "bg-stone-100 text-stone-900 font-medium"
                    : "text-stone-500 hover:bg-stone-100"
                  }`}
              >
                {trip}
              </div>
            ))}

            <p className="text-[10px] font-medium text-stone-400 tracking-[0.08em] uppercase mt-4 mb-2">
              Settings
            </p>

            {SIDEBAR_SETTINGS.map((item) => (
              <div
                key={item}
                className="px-2.5 py-1.5 rounded-md text-[13px] text-stone-500 cursor-pointer hover:bg-stone-100"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Main pane */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[17px] font-medium text-stone-900">
                  Paris Itinerary
                </p>

                <p className="text-[13px] text-stone-400 mt-0.5">
                  7 days · 2 travellers · Moderate budget
                </p>
              </div>

              <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Ready
              </span>
            </div>

            {/* Day cards */}
            <div className="flex flex-col gap-2.5">
              {DAYS.map((day) => (
                <div
                  key={day.day}
                  className="border border-stone-200 rounded-lg overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-2.5 bg-stone-100 border-b border-stone-200">
                    <span className="text-[13px] font-medium text-stone-900">
                      {day.day}
                    </span>

                    <span className="text-[12px] text-stone-400">
                      {day.theme}
                    </span>
                  </div>

                  {day.places.map((place, i) => (
                    <div
                      key={place.name}
                      className={`flex items-center justify-between px-4 py-2.5 ${i < day.places.length - 1
                          ? "border-b border-stone-200"
                          : ""
                        }`}
                    >
                      <div>
                        <p className="text-[13px] text-stone-900">
                          {place.name}
                        </p>

                        <p className="text-[12px] text-stone-400">
                          {place.meta}
                        </p>
                      </div>

                      <span className="text-[12px] font-medium text-stone-600 whitespace-nowrap ml-4">
                        {place.time}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <DestinationMarquee />
      <Stats />
      <HowItWorks />
      <Features />
      <Contact />
      <Footer />
    </section>
  );
}