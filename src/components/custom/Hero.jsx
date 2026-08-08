import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Navbar from "../custom/Navbar";
import Footer from "../custom/Footer";
import HowItWorks from "../custom/HowItWorks";
import Features from "../custom/Features";
import Stats from "../custom/Stats";
import Contact from "../custom/Contact";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=80",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=80",
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80",
];

const DESTINATIONS = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
  },
  {
    id: "new-york",
    name: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
  },
];

const POPULAR_JOURNEYS = [
  {
    id: 1,
    title: "Alpine Escape",
    subtitle: "Swiss Alps • 5 days • 2 travelers",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    side: "left",
  },
  {
    id: 2,
    title: "Coastal Drives",
    subtitle: "Amalfi Coast • 4 days • 2 travelers",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
    side: "right",
  },
  {
    id: 3,
    title: "Northern Lights",
    subtitle: "Tromsø • 6 days • 1 traveler",
    image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80",
    side: "left",
  },
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const carouselRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
        setIsFading(false);
      }, 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollRail = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {HERO_IMAGES.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Travel destination ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] ease-in-out ${
              index === currentImage && !isFading ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 pt-24 pb-16">
          <div className="max-w-3xl">
            <p
              className="text-white/80 text-xl md:text-2xl mb-4"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Collect memories, not things.
            </p>

            <h1 className="font-serif text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight mb-8">
              Plan any trip,<br />
              in seconds.
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/create-trip" className="no-underline">
                <Button
                  variant="outline"
                  className="rounded-full bg-transparent dark:bg-transparent px-8 py-3.5 text-sm font-medium border-white/40 text-white hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  Start Planning
                </Button>
              </Link>

              {user && (
                <Link to="/my-trips" className="no-underline">
                  <Button
                    variant="outline"
                    className="rounded-full bg-transparent dark:bg-transparent px-8 py-3.5 text-sm font-medium border-white/40 text-white hover:bg-white/10 hover:text-white transition-all duration-200"
                  >
                    View My Trips
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Destination Rail */}
      <section className="relative z-20 -mt-2 mx-auto max-w-7xl px-6 md:px-10 pb-12">
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-foreground text-2xl md:text-3xl">
              Popular Destinations
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollRail("left")}
                aria-label="Scroll destinations left"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => scrollRail("right")}
                aria-label="Scroll destinations right"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div ref={carouselRef} className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth group">
            {DESTINATIONS.map((dest) => (
              <Link
                key={dest.id}
                to="/create-trip"
                className="flex-shrink-0 w-[240px] md:w-[280px] snap-start transition-all duration-300 hover:scale-105 hover:z-10 hover:opacity-100 group-hover:opacity-80"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 text-white/90">
                      <MapPin className="h-4 w-4" strokeWidth={1.5} />
                      <span className="font-medium text-lg">{dest.name}</span>
                    </div>
                    <p className="text-white/60 text-sm mt-1">{dest.country}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <span className="text-muted-foreground text-sm font-mono">01</span>
          </div>
        </div>
      </section>

      {/* Popular Journeys */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-24">
        <div className="mb-12 md:mb-16">
          <h2 className="font-serif text-foreground text-3xl md:text-4xl lg:text-5xl mb-4">
            Popular Journeys
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Curated itineraries crafted by AI, refined by travelers who've been
            there.
          </p>
        </div>

        <div className="flex flex-col gap-8 md:gap-12">
          {POPULAR_JOURNEYS.map((journey) => (
            <div
              key={journey.id}
              className={`flex flex-col md:flex-row gap-6 md:gap-10 items-center border border-border rounded-2xl p-4 md:p-6 ${
                journey.side === "right" ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden">
                <img
                  src={journey.image}
                  alt={journey.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="font-serif text-foreground text-2xl md:text-3xl mb-3">
                  {journey.title}
                </h3>
                <p className="text-muted-foreground mb-6">{journey.subtitle}</p>
                <Link to="/create-trip" className="no-underline self-start">
                  <Button
                    variant="outline"
                    className="rounded-full px-6 py-2.5 text-sm font-medium"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Features */}
      <Features />

      {/* Stats */}
      <Stats />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
}
