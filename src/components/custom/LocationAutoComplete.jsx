import useLocationSearch from "../../hooks/useLocationSearch";
import { MapPin, Loader2 } from "lucide-react";

const LocationAutocomplete = ({ selectProps }) => {
  const { query, results, loading, search, setQuery, setResults } =
    useLocationSearch();

  return (
    <div className="relative">
      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
      <input
        value={query}
        onChange={(e) => search(e.target.value)}
        placeholder="Enter destination"
        className="w-full pl-12 pr-5 p-5 text-foreground border-2 rounded-2xl border-input bg-background shadow-sm placeholder-muted-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />

      {loading && (
        <div className="absolute bg-card w-full p-3 text-sm text-muted-foreground border rounded-xl shadow-sm flex items-center gap-2 mt-1">
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <ul className="mt-1 absolute z-10 bg-card border w-full text-foreground rounded-2xl shadow-lg overflow-y-scroll max-h-65 divide-y divide-border">
          {results.map((place) => (
            <li
              key={place.place_id}
              className="p-3 hover:bg-muted cursor-pointer text-sm flex items-start gap-2"
              onClick={() => {
                const selectedPlace = {
                  label: place.display_name,
                  lat: place.lat,
                  lon: place.lon,
                  id: place.place_id,
                };
                setQuery(place.display_name);
                setResults([]);
                selectProps?.onChange?.(selectedPlace);
              }}
            >
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
              <span>{place.display_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
