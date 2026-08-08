import { CalendarDays, Hotel, MapPin, Code, DollarSign, Clock } from "lucide-react";

const FEATURES = [
  {
    title: "Day-by-day itinerary",
    description:
      "Each day has a theme, a list of places with visit times, and the best time of day to go. Ordered to minimise travel between spots.",
    icon: CalendarDays,
  },
  {
    title: "Hotel recommendations",
    description:
      "Multiple options per budget level with addresses, nightly price ranges, ratings, and map coordinates ready to use.",
    icon: Hotel,
  },
  {
    title: "Geo coordinates",
    description:
      "Every hotel and attraction includes exact latitude and longitude. Drop them into any map library or Google Maps link.",
    icon: MapPin,
  },
  {
    title: "Clean JSON output",
    description:
      "The full trip is returned as typed, predictable JSON. Plug it into your React app, save to Firebase, or pipe into any backend.",
    icon: Code,
  },
  {
    title: "Ticket pricing",
    description:
      "Each place lists an estimated ticket cost so you can budget the whole trip upfront, not just accommodation.",
    icon: DollarSign,
  },
  {
    title: "Visit duration",
    description:
      "Estimated time at each place so your days are realistic — not overloaded or half-empty.",
    icon: Clock,
  },
];

export default function Features() {
  return (
    <section id="features" className="w-[80%] mx-auto px-6 md:px-10 py-16 md:py-24">
      {/* Heading */}
      <div className="text-center mb-12 md:mb-16">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-3">
          Features
        </p>

        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
          What you get
          <br />
          <i className="text-muted-foreground">in every trip.</i>
        </h2>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          JOURNI generates structured, detailed trip data — not just a list of
          places to look up later.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {FEATURES.map((feature) => {
          const RowIcon = feature.icon;
          return (
            <div key={feature.title} className="rounded-2xl border border-border bg-card p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-primary mb-4">
                <RowIcon className="h-5 w-5" strokeWidth={1.6} />
              </div>

              <p className="text-base font-medium text-foreground mb-1.5">
                {feature.title}
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
