const STATS = [
  { value: "12k", label: "Trips planned" },
  { value: "180+", label: "Destinations" },
  { value: "~4s", label: "Generation time" },
  { value: "Free", label: "To start" },
];

export default function Stats() {
  return (
    <section className="max-w-4xl mx-auto px-10 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 border border-stone-200 rounded-xl overflow-hidden divide-x divide-y md:divide-y-0 divide-stone-200">
        {STATS.map(({ value, label }) => (
          <div key={label} className="bg-stone-50 py-5 px-4 text-center">
            <p className="font-serif text-[34px] text-stone-900 leading-none">
              {value}
            </p>

            <p className="text-xs text-stone-400 mt-1">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}