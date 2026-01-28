import LocationAutocomplete from "../components/custom/LocationAutoComplete";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { SelectBudgetOptions, SelectTravelsList } from "../constants/options";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AI_PROMPT, generateTripStream } from "../service/AiModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import SignInDialog from "../components/custom/sign-in-dialog";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // json trip data

  //   const tripData = ```json
  // {
  //   "trip_details": {
  //     "location": "Paris, Ile-de-France, Metropolitan France, France",
  //     "duration_days": 3,
  //     "travelers": 2,
  //  "budget": "Premium",
  //     "description": "A luxury 3-day itinerary focusing on iconic Parisian landmarks, exclusive experiences, high-end dining, and premium accommodations."
  //   },
  //   "hotels_options":
  //  [
  //     {
  //       "hotel_name": "Ritz Paris",
  //       "hotel_address": "15 Place Vendôme, 75001 Paris, France",
  //       "price_range": "€€€€+ (€2,000 - €5,000 per night)",
  //       "hotel_image_url": "https://example.com/images/ritz_paris.jpg",
  //       "geo_coordinates": {
  //         "latitude": 48.8682,
  //         "longitude": 2.3298
  //       },
  //       "rating": 5.0,
  //       "description": "An iconic luxury hotel located in Place Vendôme, famous for its opulent suites, impeccable service, and prestigious history. The hotel features a world-class spa and gourmet dining options like La Table de L'Espadon."
  //     },
  //     {
  //       "hotel_name": "Four Seasons Hotel George V Paris",
  //       "hotel_address": "31 Avenue George V, 75008 Paris, France",
  //       "price_range": "€€€€+ (€1,800 - €4,500 per night)",
  //       "hotel_image_url": "https://example.com/images/four_seasons_george_v.jpg",
  //       "geo_coordinates": {
  //         "latitude": 48.8686,
  //         "longitude": 2.3023
  //       },
  //       "rating": 5.0,
  //       "description": "A quintessential Parisian luxury experience located near the Champs-Élysées. Known for its extraordinary floral arrangements, three Michelin-starred restaurants, and impeccable service, it offers classic elegance and modern amenities."
  //     },
  //     {
  //       "hotel_name": "Le Bristol Paris",
  //       "hotel_address": "112 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
  //       "price_range": "€€€€+ (€1,500 - €3,500 per night)",
  //       "hotel_image_url": "https://example.com/images/le_bristol_paris.jpg",
  //       "geo_coordinates": {
  //         "latitude": 48.8718,
  //         "longitude": 2.3134
  //       },
  //       "rating": 5.0,
  //       "description": "A 'Palace' hotel known for its large rooms, beautiful inner courtyard garden, and the three Michelin-starred restaurant Epicure. Le Bristol offers a truly Parisian experience of sophisticated luxury and refined style in the heart of the fashion district."
  //     }
  //   ],
  //   "itinerary": [
  //     {
  //       "day": 1,
  //       "day_theme": "Iconic Landmarks and Romantic Evening",
  //       "plan": [
  //         {
  //           "place_name": "Eiffel Tower",
  //           "place_details": "Begin the trip with a premium experience at Paris's most famous landmark. Skip-the-line guided tour or priority access ticket to the summit, offering unparalleled views of the city. Consider visiting in the morning to avoid afternoon crowds.",
  //           "place_image_url": "https://example.com/images/eiffel_tower.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8584,
  //             "longitude": 2.2945
  //           },
  //           "ticket_pricing": "€70 - €150 per person (premium guided tour or summit access)",
  //           "rating": 4.7,
  //           "time_travel_duration": "2 hours",
  //           "best_time_to_visit": "Morning (9:00 AM) or sunset"
  //         },
  //         {
  //           "place_name": "Arc de Triomphe and Champs-Élysées",
  //           "place_details": "Stroll down the Avenue des Champs-Élysées, indulging in luxury shopping. Conclude at the Arc de Triomphe for stunning panoramic views, especially at sunset, to see the city lights turn on. Premium 'skip-the-line' access recommended.",
  //           "place_image_url": "https://example.com/images/arc_de_triomphe.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8738,
  //             "longitude": 2.2950
  //           },
  //           "ticket_pricing": "€16 - €25 per person (skip-the-line entry to Arc de Triomphe rooftop)",
  //           "rating": 4.6,
  //           "time_travel_duration": "2 hours",
  //           "best_time_to_visit": "Late afternoon (4:00 PM - 6:00 PM)"
  //         },
  //         {
  //           "place_name": "Seine River Dinner Cruise",
  //           "place_details": "Experience the beauty of Paris from the water with a premium dinner cruise. Choose a high-end service like Bateaux Parisiens or Yachts de Paris for an exceptional gastronomic experience as you float past illuminated landmarks like Notre Dame and the Louvre.",
  //           "place_image_url": "https://example.com/images/seine_cruise.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8617,
  //             "longitude": 2.3060
  //           },
  //           "ticket_pricing": "€120 - €250 per person (premium dinner and drinks package)",
  //           "rating": 4.5,
  //           "time_travel_duration": "2.5 hours",
  //           "best_time_to_visit": "Evening (7:00 PM)"
  //         }
  //       ]
  //     },
  //     {
  //       "day": 2,
  //       "day_theme": "Art, Culture, and Parisian Chic",
  //       "plan": [
  //         {
  //           "place_name": "Louvre Museum",
  //           "place_details": "Explore one of the world's largest art museums. For a premium experience, consider booking a private, early-access tour to view masterpieces like the Mona Lisa and Venus de Milo without the general crowds. Focus on specific wings based on your interest to optimize time.",
  //           "place_image_url": "https://example.com/images/louvre.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8606,
  //             "longitude": 2.3376
  //           },
  //           "ticket_pricing": "€22 per person (standard entry) / €150+ per person (private guided tour)",
  //           "rating": 4.6,
  //           "time_travel_duration": "3-4 hours",
  //           "best_time_to_visit": "Early morning (9:00 AM) or Wednesday/Friday evening"
  //         },
  //         {
  //           "place_name": "Musée d'Orsay",
  //           "place_details": "Located in a stunning Beaux-Arts railway station, this museum houses masterpieces of Impressionist and Post-Impressionist art, including works by Monet, Renoir, and Van Gogh. A great follow-up to the Louvre for art lovers, offering a different artistic perspective.",
  //           "place_image_url": "https://example.com/images/musee_orsay.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8598,
  //             "longitude": 2.3265
  //           },
  //           "ticket_pricing": "€16 per person (standard entry)",
  //           "rating": 4.6,
  //           "time_travel_duration": "2 hours",
  //           "best_time_to_visit": "Afternoon"
  //         },
  //         {
  //           "place_name": "Saint-Germain-des-Prés and Fine Dining",
  //           "place_details": "Spend the late afternoon exploring the chic neighborhood of Saint-Germain-des-Prés, famous for its luxury boutiques, art galleries, and historic cafes (like Café de Flore and Les Deux Magots). Conclude with a premium dinner reservation at a Michelin-starred restaurant in the area.",
  //           "place_image_url": "https://example.com/images/saint_germain.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8540,
  //             "longitude": 2.3330
  //           },
  //           "ticket_pricing": "N/A (Shopping and dining costs vary widely)",
  //           "rating": 4.5,
  //           "time_travel_duration": "3 hours",
  //           "best_time_to_visit": "Late afternoon/Evening"
  //         }
  //       ]
  //     },
  //     {
  //       "day": 3,
  //       "day_theme": "Royal Grandeur or Artistic Bohemia",
  //       "plan": [
  //         {
  //           "place_name": "Palace of Versailles Day Trip",
  //           "place_details": "For the premium experience, take a day trip to the Palace of Versailles. Book a private tour of the State Apartments and Hall of Mirrors. Explore the magnificent gardens, often featuring musical fountain shows on weekends. Premium tickets include access to the Trianon Palaces and Marie Antoinette's Estate.",
  //           "place_image_url": "https://example.com/images/versailles.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8049,
  //             "longitude": 2.1204
  //           },
  //           "ticket_pricing": "€21 per person (Palace and Estate access) / €80 - €150+ per person (private tour)",
  //           "rating": 4.7,
  //           "time_travel_duration": "4-5 hours (including travel from Paris)",
  //           "best_time_to_visit": "Full day (9:00 AM start)"
  //         },
  //         {
  //           "place_name": "Montmartre and Sacré-Cœur Basilica",
  //           "place_details": "Alternatively, explore the artistic neighborhood of Montmartre. Visit the Sacré-Cœur Basilica, offering some of the best high-point views of Paris. Wander through Place du Tertre, where artists create and display their work. Enjoy a final, traditional French lunch here.",
  //           "place_image_url": "https://example.com/images/sacre_coeur.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8867,
  //             "longitude": 2.3431
  //           },
  //           "ticket_pricing": "Free entry to Basilica; €8 for Dome climb",
  //           "rating": 4.5,
  //           "time_travel_duration": "2-3 hours",
  //           "best_time_to_visit": "Morning (for fewer crowds on steps)"
  //         },
  //         {
  //           "place_name": "Shopping at Galeries Lafayette Haussmann",
  //           "place_details": "Experience high-end Parisian department store luxury. The stunning Art Nouveau dome makes it a sight in itself. The store offers personal shoppers and exclusive VIP lounges for a truly premium shopping experience.",
  //           "place_image_url": "https://example.com/images/galeries_lafayette.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8735,
  //             "longitude": 2.3328
  //           },
  //           "ticket_pricing": "N/A (Shopping costs vary)",
  //           "rating": 4.4,
  //           "time_travel_duration": "2 hours",
  //           "best_time_to_visit": "Afternoon"
  //         }
  //       ]
  //     }
  //   ]
  // }

  //
  // FULL RESPONSE: ```json
  // {
  //   "trip_details": {
  //     "location": "Paris, Ile-de-France, Metropolitan France, France",
  //     "duration_days": 3,
  //     "travelers": 2,
  //     "budget": "Premium",
  //     "description": "A luxury 3-day itinerary focusing on iconic Parisian landmarks, exclusive experiences, high-end dining, and premium accommodations."
  //   },
  //   "hotels_options": [
  //     {
  //       "hotel_name": "Ritz Paris",
  //       "hotel_address": "15 Place Vendôme, 75001 Paris, France",
  //       "price_range": "€€€€+ (€2,000 - €5,000 per night)",
  //       "hotel_image_url": "https://example.com/images/ritz_paris.jpg",
  //       "geo_coordinates": {
  //         "latitude": 48.8682,
  //         "longitude": 2.3298
  //       },
  //       "rating": 5.0,
  //       "description": "An iconic luxury hotel located in Place Vendôme, famous for its opulent suites, impeccable service, and prestigious history. The hotel features a world-class spa and gourmet dining options like La Table de L'Espadon."
  //     },
  //     {
  //       "hotel_name": "Four Seasons Hotel George V Paris",
  //       "hotel_address": "31 Avenue George V, 75008 Paris, France",
  //       "price_range": "€€€€+ (€1,800 - €4,500 per night)",
  //       "hotel_image_url": "https://example.com/images/four_seasons_george_v.jpg",
  //       "geo_coordinates": {
  //         "latitude": 48.8686,
  //         "longitude": 2.3023
  //       },
  //       "rating": 5.0,
  //       "description": "A quintessential Parisian luxury experience located near the Champs-Élysées. Known for its extraordinary floral arrangements, three Michelin-starred restaurants, and impeccable service, it offers classic elegance and modern amenities."
  //     },
  //     {
  //       "hotel_name": "Le Bristol Paris",
  //       "hotel_address": "112 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
  //       "price_range": "€€€€+ (€1,500 - €3,500 per night)",
  //       "hotel_image_url": "https://example.com/images/le_bristol_paris.jpg",
  //       "geo_coordinates": {
  //         "latitude": 48.8718,
  //         "longitude": 2.3134
  //       },
  //       "rating": 5.0,
  //       "description": "A 'Palace' hotel known for its large rooms, beautiful inner courtyard garden, and the three Michelin-starred restaurant Epicure. Le Bristol offers a truly Parisian experience of sophisticated luxury and refined style in the heart of the fashion district."
  //     }
  //   ],
  //   "itinerary": [
  //     {
  //       "day": 1,
  //       "day_theme": "Iconic Landmarks and Romantic Evening",
  //       "plan": [
  //         {
  //           "place_name": "Eiffel Tower",
  //           "place_details": "Begin the trip with a premium experience at Paris's most famous landmark. Skip-the-line guided tour or priority access ticket to the summit, offering unparalleled views of the city. Consider visiting in the morning to avoid afternoon crowds.",
  //           "place_image_url": "https://example.com/images/eiffel_tower.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8584,
  //             "longitude": 2.2945
  //           },
  //           "ticket_pricing": "€70 - €150 per person (premium guided tour or summit access)",
  //           "rating": 4.7,
  //           "time_travel_duration": "2 hours",
  //           "best_time_to_visit": "Morning (9:00 AM) or sunset"
  //         },
  //         {
  //           "place_name": "Arc de Triomphe and Champs-Élysées",
  //           "place_details": "Stroll down the Avenue des Champs-Élysées, indulging in luxury shopping. Conclude at the Arc de Triomphe for stunning panoramic views, especially at sunset, to see the city lights turn on. Premium 'skip-the-line' access recommended.",
  //           "place_image_url": "https://example.com/images/arc_de_triomphe.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8738,
  //             "longitude": 2.2950
  //           },
  //           "ticket_pricing": "€16 - €25 per person (skip-the-line entry to Arc de Triomphe rooftop)",
  //           "rating": 4.6,
  //           "time_travel_duration": "2 hours",
  //           "best_time_to_visit": "Late afternoon (4:00 PM - 6:00 PM)"
  //         },
  //         {
  //           "place_name": "Seine River Dinner Cruise",
  //           "place_details": "Experience the beauty of Paris from the water with a premium dinner cruise. Choose a high-end service like Bateaux Parisiens or Yachts de Paris for an exceptional gastronomic experience as you float past illuminated landmarks like Notre Dame and the Louvre.",
  //           "place_image_url": "https://example.com/images/seine_cruise.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8617,
  //             "longitude": 2.3060
  //           },
  //           "ticket_pricing": "€120 - €250 per person (premium dinner and drinks package)",
  //           "rating": 4.5,
  //           "time_travel_duration": "2.5 hours",
  //           "best_time_to_visit": "Evening (7:00 PM)"
  //         }
  //       ]
  //     },
  //     {
  //       "day": 2,
  //       "day_theme": "Art, Culture, and Parisian Chic",
  //       "plan": [
  //         {
  //           "place_name": "Louvre Museum",
  //           "place_details": "Explore one of the world's largest art museums. For a premium experience, consider booking a private, early-access tour to view masterpieces like the Mona Lisa and Venus de Milo without the general crowds. Focus on specific wings based on your interest to optimize time.",
  //           "place_image_url": "https://example.com/images/louvre.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8606,
  //             "longitude": 2.3376
  //           },
  //           "ticket_pricing": "€22 per person (standard entry) / €150+ per person (private guided tour)",
  //           "rating": 4.6,
  //           "time_travel_duration": "3-4 hours",
  //           "best_time_to_visit": "Early morning (9:00 AM) or Wednesday/Friday evening"
  //         },
  //         {
  //           "place_name": "Musée d'Orsay",
  //           "place_details": "Located in a stunning Beaux-Arts railway station, this museum houses masterpieces of Impressionist and Post-Impressionist art, including works by Monet, Renoir, and Van Gogh. A great follow-up to the Louvre for art lovers, offering a different artistic perspective.",
  //           "place_image_url": "https://example.com/images/musee_orsay.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8598,
  //             "longitude": 2.3265
  //           },
  //           "ticket_pricing": "€16 per person (standard entry)",
  //           "rating": 4.6,
  //           "time_travel_duration": "2 hours",
  //           "best_time_to_visit": "Afternoon"
  //         },
  //         {
  //           "place_name": "Saint-Germain-des-Prés and Fine Dining",
  //           "place_details": "Spend the late afternoon exploring the chic neighborhood of Saint-Germain-des-Prés, famous for its luxury boutiques, art galleries, and historic cafes (like Café de Flore and Les Deux Magots). Conclude with a premium dinner reservation at a Michelin-starred restaurant in the area.",
  //           "place_image_url": "https://example.com/images/saint_germain.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8540,
  //             "longitude": 2.3330
  //           },
  //           "ticket_pricing": "N/A (Shopping and dining costs vary widely)",
  //           "rating": 4.5,
  //           "time_travel_duration": "3 hours",
  //           "best_time_to_visit": "Late afternoon/Evening"
  //         }
  //       ]
  //     },
  //     {
  //       "day": 3,
  //       "day_theme": "Royal Grandeur or Artistic Bohemia",
  //       "plan": [
  //         {
  //           "place_name": "Palace of Versailles Day Trip",
  //           "place_details": "For the premium experience, take a day trip to the Palace of Versailles. Book a private tour of the State Apartments and Hall of Mirrors. Explore the magnificent gardens, often featuring musical fountain shows on weekends. Premium tickets include access to the Trianon Palaces and Marie Antoinette's Estate.",
  //           "place_image_url": "https://example.com/images/versailles.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8049,
  //             "longitude": 2.1204
  //           },
  //           "ticket_pricing": "€21 per person (Palace and Estate access) / €80 - €150+ per person (private tour)",
  //           "rating": 4.7,
  //           "time_travel_duration": "4-5 hours (including travel from Paris)",
  //           "best_time_to_visit": "Full day (9:00 AM start)"
  //         },
  //         {
  //           "place_name": "Montmartre and Sacré-Cœur Basilica",
  //           "place_details": "Alternatively, explore the artistic neighborhood of Montmartre. Visit the Sacré-Cœur Basilica, offering some of the best high-point views of Paris. Wander through Place du Tertre, where artists create and display their work. Enjoy a final, traditional French lunch here.",
  //           "place_image_url": "https://example.com/images/sacre_coeur.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8867,
  //             "longitude": 2.3431
  //           },
  //           "ticket_pricing": "Free entry to Basilica; €8 for Dome climb",
  //           "rating": 4.5,
  //           "time_travel_duration": "2-3 hours",
  //           "best_time_to_visit": "Morning (for fewer crowds on steps)"
  //         },
  //         {
  //           "place_name": "Shopping at Galeries Lafayette Haussmann",
  //           "place_details": "Experience high-end Parisian department store luxury. The stunning Art Nouveau dome makes it a sight in itself. The store offers personal shoppers and exclusive VIP lounges for a truly premium shopping experience.",
  //           "place_image_url": "https://example.com/images/galeries_lafayette.jpg",
  //           "geo_coordinates": {
  //             "latitude": 48.8735,
  //             "longitude": 2.3328
  //           },
  //           "ticket_pricing": "N/A (Shopping costs vary)",
  //           "rating": 4.4,
  //           "time_travel_duration": "2 hours",
  //           "best_time_to_visit": "Afternoon"
  //         }
  //       ]
  //     }
  //   ]
  // }
  // ```

  const handleInputChange = (name, value) => {
    console.log("Selected data:", value);
    // save to state / DB later
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      (formData?.total_days > 10 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast.warning("Please enter correct details");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label,
    )
      .replace("{total_days}", formData?.total_days)
      .replace("{traveller}", formData?.traveller)
      .replace("{budget}", formData?.budget);

    try {
      let streamedText = "";

      const result = await generateTripStream(FINAL_PROMPT, (chunk) => {
        streamedText += chunk;
        // console.log("chunk", chunk); // live stream output
      });

      console.log("FULL RESPONSE:", result);
      setLoading(false);
      SaveAITrip(result);
      console.log(
        "==============================================================================",
      );

      // If Gemini returns JSON
      // const parsed = JSON.parse(result);
      // console.log("PARSED RESULT:", parsed);
      console.log("streamedText", streamedText);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate trip");
    }
  };

  const extractJSON = (text) => {
    // Remove ```json and ``` fences
    return text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  };

  const SaveAITrip = async (TripData) => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();

      const cleanJSON = extractJSON(TripData);
      const parsedTrip = JSON.parse(cleanJSON);

      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedTrip,
        userEmail: user?.email,
        id: docId,
      });

      setLoading(false);
      navigate("/view-trip/" + docId);
    } catch (error) {
      console.error("JSON Parse Error:", error);
      toast.error("AI response format error");
      setLoading(false);
    }
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        },
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 mb-10">
        <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information and our trip planner will generate
          a customized itinerary based on your preferences.
        </p>

        <div className="mt-15 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium">
              What is your destination choice?
            </h2>
            {/* <GooglePlacesAutocomplete
                 apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                /> */}
            <LocationAutocomplete
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  console.log("v", v);
                  handleInputChange("location", v);
                },
              }}
              // selectProps={handleLocationSelect}
            />
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">
              How many days are you planning for your trip?
            </h2>
            <Input
              onChange={(e) => handleInputChange("total_days", e.target.value)}
              placeholder={"Ex. 3"}
              type="number"
            />
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-4 border rounded-lg cursor-pointer
                    ${
                      formData?.budget == item.title &&
                      "shadow-2xl border-fuchsia-600"
                    }`}
                >
                  <h2 className="text-4xl ">{item.icon} </h2>
                  <h2 className="font-bold text-lg">{item.title} </h2>
                  <h2 className="text-sm text-gray-500">{item.description} </h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">
              Who do you plan on travelling with on your next adventure?
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectTravelsList.map((item, index) => (
                <div
                  onClick={() => handleInputChange("traveller", item.people)}
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer
                    ${
                      formData?.traveller == item.people &&
                      "shadow-2xl border-fuchsia-600"
                    }`}
                >
                  <h2 className="text-4xl">{item.icon} </h2>
                  <h2 className="font-bold text-lg">{item.title} </h2>
                  <h2 className="text-sm text-gray-500">{item.description} </h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-10 flex justify-end ">
          <Button disabled={loading} onClick={OnGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>
      </div>

      <SignInDialog
        login={login}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
};

export default CreateTrip;
