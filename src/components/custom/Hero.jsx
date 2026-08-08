import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, ChevronLeft, ChevronRight, Star, StarHalf } from "lucide-react";
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

const TESTIMONIALS = [
  {
    id: 1,
    name: "Daniel Reyes",
    role: "Backpacker, Berlin",
    rating: 5,
    quote:
      "JOURNI turned our vague 'somewhere in Japan' idea into a day-by-day plan we actually followed. The pacing was spot on.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces&q=80",
  },
  {
    id: 2,
    name: "Sofia Marchetti",
    role: "Product Designer, Milan",
    rating: 4,
    quote:
      "I planned a week in Lisbon in one sitting. Every restaurant it recommended was a hit with my friends.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces&q=80",
  },
  {
    id: 3,
    name: "Liam O'Connor",
    role: "Photographer, Dublin",
    rating: 4.5,
    quote:
      "The itinerary balanced sightseeing and slow mornings perfectly. It felt like a local friend had planned it for me.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces&q=80",
  },
  {
    id: 4,
    name: "Amara Okafor",
    role: "Grad Student, London",
    rating: 3,
    quote:
      "I was nervous about a solo trip to Morocco, but the plan made me feel prepared. I never felt lost once.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces&q=80",
  },
  {
    id: 5,
    name: "Marcus Chen",
    role: "Software Engineer, Toronto",
    rating: 5,
    quote:
      "We changed our dates three times and JOURNI rebuilt the whole plan in seconds each time. Huge time-saver.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&h=160&fit=crop&crop=faces&q=80",
  },
  {
    id: 6,
    name: "Elena Novak",
    role: "Teacher, Vienna",
    rating: 4.5,
    quote:
      "Our family trip to Italy went flawlessly. The daily suggestions meant zero planning stress for me.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=faces&q=80",
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
      <section className="relative z-20 mt-8 mx-auto max-w-7xl px-6 md:px-10 pb-12">
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

      {/* Traveler Feedback */}
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-24">
        <div className="mb-12 md:mb-16">
          <h2 className="font-serif text-foreground text-3xl md:text-4xl lg:text-5xl mb-4">
            Loved by travelers
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Real feedback from people who planned their trips with JOURNI.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div
                className="flex items-center gap-1 mb-4"
                aria-label={`Rated ${testimonial.rating} out of 5 stars`}
              >
                {[...Array(5)].map((_, i) => {
                  const position = i + 1;
                  if (testimonial.rating >= position) {
                    return (
                      <Star
                        key={i}
                        className="h-4 w-4 text-primary fill-current"
                        strokeWidth={1.5}
                      />
                    );
                  }
                  if (testimonial.rating >= position - 0.5) {
                    return (
                      <StarHalf
                        key={i}
                        className="h-4 w-4 text-primary fill-current"
                        strokeWidth={1.5}
                      />
                    );
                  }
                  return (
                    <Star
                      key={i}
                      className="h-4 w-4 text-muted-foreground"
                      strokeWidth={1.5}
                    />
                  );
                })}
              </div>

              <blockquote className="text-foreground flex-1">
                <p>{testimonial.quote}</p>
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </figcaption>
            </figure>
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
