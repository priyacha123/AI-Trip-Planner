import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-[60px] flex items-center justify-between px-10 bg-stone-50 border-b border-stone-200">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 no-underline">
        <div className="w-[28px] h-[28px] flex items-center justify-center border-[1.5px] border-stone-900 rounded-[6px]">
          <svg
            viewBox="0 0 24 24"
            className="w-[13px] h-[13px] fill-none stroke-stone-900"
            strokeWidth={1.8}
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
          </svg>
        </div>

        <span className="text-[15px] font-medium text-stone-900 tracking-tight">
          Voyara
        </span>
      </a>

      {/* Center links */}
      <ul className="hidden md:flex items-center gap-7 list-none">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-sm text-stone-500 no-underline hover:text-stone-900 transition-colors duration-150"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right CTA */}
      <div className="flex items-center gap-2.5">
        <a
          href="#"
          className="text-sm text-stone-500 px-[18px] py-2 rounded-lg border border-stone-200 no-underline hover:bg-stone-100 hover:text-stone-900 transition-colors duration-150"
        >
          Sign in
        </a>

        <Link to={"/create-trip"}>
          <Button className="text-sm font-medium text-stone-50 bg-stone-900 px-[18px] py-2 rounded-lg hover:bg-stone-800 transition-colors duration-150">
            Get started
          </Button>
        </Link>
      </div>
    </nav>
  );
}
