const STEPS = [
  {
    num: "01",
    title: "Pick a destination",
    description:
      "Enter any city or region. Set your travel dates, number of travellers, and budget level. That's all the input Voyara needs.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-[15px] h-[15px] stroke-muted-foreground fill-none"
        strokeWidth={1.6}
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "AI builds the plan",
    description:
      "The AI generates a complete itinerary — hotels with prices, places with timings, geo coordinates, and ticket costs. Takes about 4 seconds.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-[15px] h-[15px] stroke-muted-foreground fill-none"
        strokeWidth={1.6}
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Save and travel",
    description:
      "Export the trip as structured JSON or browse it in the app. Every detail is saved to your account and accessible on the go.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-[15px] h-[15px] stroke-muted-foreground fill-none"
        strokeWidth={1.6}
      >
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-4xl mx-auto px-6 md:px-10 pb-16">
      {/* Heading */}
      <p className="text-[11px] font-medium text-muted-foreground tracking-[0.08em] uppercase mb-3">
        How it works
      </p>

      <h2 className="font-serif text-[36px] font-normal text-foreground leading-[1.2] mb-3">
        Three steps,
        <br />
        <i className="text-muted-foreground">one itinerary.</i>
      </h2>

      <p className="text-[15px] font-light text-muted-foreground leading-[1.75] max-w-sm mb-10">
        No accounts needed to try it. Enter a destination and Voyara handles
        the rest.
      </p>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 border rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x">
        {STEPS.map(({ num, title, description, icon }) => (
          <div key={num} className="bg-card p-6">
            <p className="text-[11px] font-medium text-primary tracking-[0.06em] uppercase mb-3">
              {num}
            </p>

            <div className="w-[34px] h-[34px] flex items-center justify-center border rounded-lg mb-3">
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
