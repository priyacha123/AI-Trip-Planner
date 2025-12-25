import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
});

export const AI_PROMPT =`
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


export async function generateTripStream(prompt, onChunk) {
  const tools = [{ googleSearch: {} }];

  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
  };

  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model: "gemini-robotics-er-1.5-preview",
    config,
    contents,
  });

  let fullText = "";

  for await (const chunk of response) {
    if (chunk.text) {
      fullText += chunk.text;
      onChunk?.(chunk.text); // stream text to UI
    }
  }

  return fullText;
}


