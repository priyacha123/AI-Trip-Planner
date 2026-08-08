import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
});

export const AI_PROMPT = `
You are a JSON-only response generator.

Generate a travel plan using the EXACT JSON structure and field names described below.
Do NOT add, remove, or rename any fields.
Do NOT include explanations, markdown, or extra text.
Return ONLY valid JSON.

INPUT VARIABLES:
- location: {location}
- total_days: {total_days}
- traveller: {traveller}
- budget: {budget}
- userEmail: {userEmail}

RULES:
- Output must start with { and end with }
- Use realistic values
- All geo_coordinates must contain numeric latitude and longitude
- Ratings must be strings (example: "4.8/5", "5-Star")
- The "plan" array in each itinerary day must contain as many places as the day can reasonably fit (aim for at least 4-5 places per day, packed with sightseeing, activities and food stops). NEVER generate a single place per day.

REQUIRED JSON FORMAT:

{
  "id": "STRING_UNIQUE_TIMESTAMP_ID",

  "tripData": {
    "trip_title": "STRING",
    "trip_summary": "STRING",
    "location": "STRING",
    "budget": "STRING",
    "duration": "STRING",
    "travelers": "STRING",

    "hotels_options": [
      {
        "hotelName": "STRING",
        "hotelAddress": "STRING",
        "hotelDescription": "STRING",
        "hotel_image_url": "STRING_URL",
        "priceRange": NUMBER,
        "rating": "STRING",
        "geo_coordinates": {
          "latitude": NUMBER,
          "longitude": NUMBER
        }
      }
    ],

    "itinerary": [
      {
        "day": NUMBER,
        "day_theme": "STRING",
        "best_time_to_visit": "STRING",

        "plan": [
          {
            "placeName": "STRING",
            "place_details": "STRING",
            "placeAddress": "STRING",
            "placeImageUrl": "STRING_URL",
            "ticket_pricing": "STRING",
            "rating": "STRING",
            "time_of_day": "STRING",
            "time_required": "STRING",
            "geo_coordinates": {
              "latitude": NUMBER,
              "longitude": NUMBER
            }
          },
          {
            "placeName": "STRING",
            "place_details": "STRING",
            "placeAddress": "STRING",
            "placeImageUrl": "STRING_URL",
            "ticket_pricing": "STRING",
            "rating": "STRING",
            "time_of_day": "STRING",
            "time_required": "STRING",
            "geo_coordinates": {
              "latitude": NUMBER,
              "longitude": NUMBER
            }
          }
        ]
      }
    ]
  },

  "userEmail": "STRING",

  "userSelection": {
    "budget": "STRING",
    "traveller": NUMBER,
    "total_days": "STRING",
    "location": {
      "id": NUMBER,
      "label": "STRING",
      "lat": "STRING",
      "lon": "STRING"
    }
  }
}

Return ONLY the JSON.
`;

// export async function generateTripStream(prompt, onChunk) {
//   const tools = [{ googleSearch: {} }];

//   const config = {
//     thinkingConfig: {
//       thinkingBudget: -1,
//     },
//     tools,
//     responseMimeType: "application/json",
//   };

//   const contents = [
//     {
//       role: "user",
//       parts: [{ text: prompt }],
//     },
//   ];

//   const response = await ai.models.generateContentStream({
//     model: "gemini-2.5-pro",
//     config,
//     contents,
//   });

//   let fullText = "";

//   for await (const chunk of response) {
//     if (chunk.text) {
//       fullText += chunk.text;
//       onChunk?.(chunk.text); // stream text to UI
//     }
//   }

//   return fullText;
// }
 
export async function generateTripStream(prompt, onChunk) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }, // forces JSON output
      stream: true,
    }),
  });

  if (!response.ok) {
    if (response.status === 429)
      throw new Error("Rate limit exceeded. Wait a few seconds.");
    throw new Error(`Failed to generate trip plan (${response.status})`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = ""; // leftover partial SSE line across chunks
  let fullText = "";

  const handleLine = (line) => {
    const data = line.trim().replace(/^data:\s*/, "");
    if (!data || data === "[DONE]") return;

    let json;
    try {
      json = JSON.parse(data);
    } catch {
      return; // ignore a fragmented line that slipped through the buffering
    }

    const chunk = json?.choices?.[0]?.delta?.content || "";
    if (chunk) {
      fullText += chunk;
      onChunk?.(chunk);
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || ""; // hold the incomplete tail for the next chunk

    for (const line of lines) handleLine(line);
  }

  // flush the final partial line
  if (buffer.trim()) handleLine(buffer);

  return fullText;
}