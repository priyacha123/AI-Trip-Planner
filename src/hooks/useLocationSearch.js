import axios from 'axios'
import React, { useState } from 'react'

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"

const useLocationSearch = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState("")
    const [loading, setLoading] = useState(false)

    const search = async (value) => {
        setQuery(value)

        if (value.length < 3) {
            setResults([])
            return
        }

        setLoading(true)

        try {
            const res = await axios.get(NOMINATIM_URL, {
                params: {
                    q: value,
                    format: "json",
                    addressdetails: 1,
                    limit: 10,
                },
                headers: {
                    "User-Agent": "ai-trip-planner"
                },
            })

            setResults(res.data)
        }
        catch (err) {
            console.log("Location search failed", err);
        }
        finally {
            setLoading(false)
        }
    }



  return {
    query,
    results,
    loading,
    search,
    setQuery,
    setResults,
  }
}

export default useLocationSearch