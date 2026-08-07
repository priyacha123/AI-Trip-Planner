const DESTINATIONS = [
  "Paris, France",
  "Kyoto, Japan",
  "Santorini, Greece",
  "New York, USA",
  "Bali, Indonesia",
  "Cape Town",
  "Maldives",
  "Amalfi Coast",
  "Dubai, UAE",
  "Bangkok, Thailand",
  "Prague",
  "Buenos Aires",
];

// Duplicate to make it seamless
const ALL = [...DESTINATIONS, ...DESTINATIONS];

function Dot() {
  return (
    <span className="w-[3px] h-[3px] bg-primary/50 rounded-full inline-block" />
  );
}

export default function DestinationMarquee() {
  return (
    <div className="border-t border-b py-4 overflow-hidden">
      <div className="flex gap-11 animate-marquee w-max">
        {ALL.map((dest, i) => (
          <span
            key={`${dest}-${i}`}
            className="inline-flex items-center gap-2 text-[13.5px] text-muted-foreground whitespace-nowrap"
          >
            <Dot />
            {dest}
          </span>
        ))}
      </div>
    </div>
  );
}
