import useLocationSearch from "../../hooks/useLocationSearch";

const LocationAutocomplete = ({ selectProps }) => {
  const { query, results, loading, search, setQuery, setResults } =
    useLocationSearch();

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => search(e.target.value)}
        placeholder="Enter destination"
        className="w-full p-5 text-foreground border-2 rounded-2xl border-input bg-background shadow-sm placeholder-muted-foreground outline-none focus:border-primary transition-colors"
      />

      {loading && (
        <div className="absolute bg-card w-full p-2 text-sm text-muted-foreground border rounded-xl shadow-sm">
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <ul className="mt-1 absolute z-10 bg-card border w-full text-foreground rounded-2xl shadow-sm overflow-y-scroll max-h-65">
          {results.map((place) => (
            <li
              key={place.place_id}
              className="p-3 hover:bg-muted cursor-pointer text-sm "
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
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;