const FEATURES = [
  {
    title: "Day-by-day itinerary",
    description:
      "Each day has a theme, a list of places with visit times, and the best time of day to go. Ordered to minimise travel between spots.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-[14px] h-[14px] stroke-muted-foreground fill-none"
        strokeWidth={1.6}
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    title: "Hotel recommendations",
    description:
      "Multiple options per budget level with addresses, nightly price ranges, ratings, and map coordinates ready to use.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-[14px] h-[14px] stroke-muted-foreground fill-none"
        strokeWidth={1.6}
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Geo coordinates",
    description:
      "Every hotel and attraction includes exact latitude and longitude. Drop them into any map library or Google Maps link.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-[14px] h-[14px] stroke-muted-foreground fill-none"
        strokeWidth={1.6}
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Clean JSON output",
    description:
      "The full trip is returned as typed, predictable JSON. Plug it into your React app, save to Firebase, or pipe into any backend.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-[14px] h-[14px] stroke-muted-foreground fill-none"
        strokeWidth={1.6}
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Ticket pricing",
    description:
      "Each place lists an estimated ticket cost so you can budget the whole trip upfront, not just accommodation.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-[14px] h-[14px] stroke-muted-foreground fill-none"
        strokeWidth={1.6}
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: "Visit duration",
    description:
      "Estimated time at each place so your days are realistic — not overloaded or half-empty.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-[14px] h-[14px] stroke-muted-foreground fill-none"
        strokeWidth={1.6}
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="max-w-4xl mx-auto px-6 md:px-10 pb-16">
      {/* Heading */}
      <p className="text-[11px] font-medium text-muted-foreground tracking-[0.08em] uppercase mb-3">
        Features
      </p>

      <h2 className="font-serif text-[36px] font-normal text-foreground leading-[1.2] mb-3">
        What you get
        <br />
        <i className="text-muted-foreground">in every trip.</i>
      </h2>

      <p className="text-[15px] font-light text-muted-foreground leading-[1.75] max-w-sm mb-10">
        Voyara generates structured, detailed trip data — not just a list of
        places to look up later.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 border rounded-xl overflow-hidden divide-y md:divide-y">
        {FEATURES.map(({ title, description, icon }, i) => (
          <div
            key={title}
            className={`bg-card p-6 ${
              i % 2 === 0 ? "md:border-r" : ""
            }`}
          >
            <div className="w-[32px] h-[32px] flex items-center justify-center border rounded-[7px] mb-3">
              {icon}
            </div>

            <p className="text-[14.5px] font-medium text-foreground mb-1.5">
              {title}
            </p>

            <p className="text-[13.5px] font-light text-muted-foreground leading-[1.65]">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
