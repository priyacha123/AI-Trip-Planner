import { MapPin, Sparkles, Download } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Pick a destination",
    description:
      "Enter any city or region. Set your travel dates, number of travellers, and budget level. That's all the input JOURNI needs.",
    icon: MapPin,
  },
  {
    num: "02",
    title: "AI builds the plan",
    description:
      "The AI generates a complete itinerary — hotels with prices, places with timings, geo coordinates, and ticket costs. Takes about 4 seconds.",
    icon: Sparkles,
  },
  {
    num: "03",
    title: "Save and travel",
    description:
      "Export the trip as structured JSON or browse it in the app. Every detail is saved to your account and accessible on the go.",
    icon: Download,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-[80%] mx-auto px-6 md:px-10 py-16 md:py-24">
      {/* Heading */}
      <div className="text-center mb-12 md:mb-16">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-3">
          How it works
        </p>

        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
          Three steps,
          <br />
          <i className="text-muted-foreground">one itinerary.</i>
        </h2>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {STEPS.map((step) => {
          const RowIcon = step.icon;
          return (
            <div key={step.num} className="rounded-2xl border border-border bg-card p-7">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-4">
                {step.num}
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-primary mb-4">
                <RowIcon className="h-5 w-5" strokeWidth={1.6} />
              </div>

              <p className="text-base font-medium text-foreground mb-1.5">
                {step.title}
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
