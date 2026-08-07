import { Mountain, Waves, Landmark, UtensilsCrossed } from "lucide-react";

export const SelectTripStyles = [
  {
    id: 1,
    title: "Adventure",
    icon: Mountain,
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/40",
    text: "text-emerald-700 dark:text-emerald-300",
    bgActive: "bg-emerald-500/10",
  },
  {
    id: 2,
    title: "Relaxation",
    icon: Waves,
    color: "from-sky-500/20 to-blue-500/20",
    border: "border-sky-500/40",
    text: "text-sky-700 dark:text-sky-300",
    bgActive: "bg-sky-500/10",
  },
  {
    id: 3,
    title: "Culture",
    icon: Landmark,
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/40",
    text: "text-amber-700 dark:text-amber-300",
    bgActive: "bg-amber-500/10",
  },
  {
    id: 4,
    title: "Food",
    icon: UtensilsCrossed,
    color: "from-rose-500/20 to-pink-500/20",
    border: "border-rose-500/40",
    text: "text-rose-700 dark:text-rose-300",
    bgActive: "bg-rose-500/10",
  },
];
