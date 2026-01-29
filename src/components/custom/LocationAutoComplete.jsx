import useLocationSearch from "../../hooks/useLocationSearch";

const LocationAutocomplete = ({ selectProps }) => {
  const { query, results, loading, search, setQuery, setResults } =
    useLocationSearch();

  console.log("results", results);

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => search(e.target.value)}
        placeholder="Enter destination"
        className="w-full p-2 pl-5 text-black border-2 rounded-xl border-[#d6c2ae] dark:border-[#7a846f]
                  dark:bg-[#3a4039] dark:text-[#f5e6d8]"
      />

      {loading && (
        <div className="absolute bg-white w-full p-2 text-sm">Searching...</div>
      )}

      {results.length > 0 && (
        <ul className="mt-1 absolute z-10 bg-white border w-full text-black rounded-md shadow overflow-y-scroll h-65">
          {results.map((place) => (
            <li
              key={place.place_id}
              className="p-3 hover:bg-gray-100 cursor-pointer text-sm "
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
