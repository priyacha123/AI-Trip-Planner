import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Map, PlusCircle, Heart, Settings, User } from "lucide-react";
import { cn } from "../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const navItems = [
  { id: "home", icon: Home, label: "Home", href: "/" },
  { id: "my-trips", icon: Map, label: "My Trips", href: "/my-trips" },
  { id: "create-trip", icon: PlusCircle, label: "Create Trip", href: "/create-trip" },
  { id: "saved", icon: Heart, label: "Saved", href: "/saved" },
  { id: "settings", icon: Settings, label: "Settings", href: "/settings" },
];

const GlobalSidebar = ({ progress = 0 }) => {
  const [hovered, setHovered] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const { pathname } = useLocation();
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const isReal = (href) => href.startsWith("/");

  const handleNavClick = (e, item) => {
    if (item.id === "home" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const itemClass = (isActive) =>
    cn(
      "flex items-center gap-3 rounded-full px-3 py-3 transition-all duration-200 w-full justify-center md:justify-start",
      "text-white/50 hover:text-white hover:bg-white/5",
      isActive && "bg-primary/15 text-primary"
    );

  const renderItem = (item) => {
    const isActive = pathname === item.href;
    const inner = (
      <>
        <item.icon className="h-5 w-5 shrink-0" strokeWidth={1.5} />
        {hovered && (
          <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
        )}
      </>
    );
    return isReal(item.href) ? (
      <Link
        key={item.id}
        to={item.href}
        onClick={(e) => handleNavClick(e, item)}
        className={itemClass(isActive)}
      >
        {inner}
      </Link>
    ) : (
      <button key={item.id} type="button" className={itemClass(isActive)}>
        {inner}
      </button>
    );
  };

  const renderMobileItem = (item) => {
    const isActive = pathname === item.href;
    const cls = cn(
      "flex flex-col items-center justify-center rounded-full p-2 transition-all duration-200 min-w-[48px]",
      isActive ? "bg-primary/15 text-primary" : "text-white/40 hover:text-white"
    );
    const inner = <item.icon className="h-5 w-5" strokeWidth={1.5} />;
    return isReal(item.href) ? (
      <Link
        key={item.id}
        to={item.href}
        onClick={(e) => handleNavClick(e, item)}
        className={cls}
      >
        {inner}
      </Link>
    ) : (
      <button key={item.id} type="button" className={cls}>
        {inner}
      </button>
    );
  };

  return (
    <>
      {/* Desktop floating sidebar */}
      <nav
        className={cn(
          "fixed left-3 top-1/2 z-50 hidden md:flex flex-col items-center",
          "bg-gradient-to-b from-[#1a1917] to-[#2a2520] rounded-[24px] shadow-2xl",
          "transition-all duration-300 ease-out",
          hovered ? "w-56 p-3 gap-1.5 -translate-y-1/2" : "w-16 p-2.5 gap-5 -translate-y-1/2"
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          boxShadow: "0 20px 60px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset",
        }}
      >
        {/* Progress strip on inner edge */}
        {(pathname === "/create-trip" || pathname === "/my-trips") && progress > 0 && (
          <div className="absolute right-0 top-6 bottom-6 w-[2px] rounded-full bg-white/5 overflow-hidden">
            <div
              className="w-full bg-primary rounded-full transition-all duration-700 ease-out"
              style={{ height: `${Math.min(progress * 100, 100)}%`, marginTop: "auto", marginBottom: "auto" }}
            />
          </div>
        )}

        <div className="flex flex-col items-center gap-1 w-full">
          {navItems.map(renderItem)}
        </div>

        {/* Avatar at bottom */}
        <div className="mt-auto pt-2 w-full flex justify-center">
          {user ? (
            <Popover open={avatarOpen} onOpenChange={setAvatarOpen}>
              <PopoverTrigger asChild>
                <button className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-white/10 hover:ring-primary/50 transition-all">
                  <img src={user.picture} alt="avatar" className="h-full w-full object-cover" />
                </button>
              </PopoverTrigger>
              <PopoverContent side="right" align="center" className="w-56 p-2 text-sm">
                <div className="px-2 pb-2 mb-1 border-b border-border text-muted-foreground truncate">
                  {user.email}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-2 py-1.5 rounded-md text-destructive hover:bg-muted cursor-pointer transition-colors"
                >
                  Logout
                </button>
              </PopoverContent>
            </Popover>
          ) : (
            <Popover open={avatarOpen} onOpenChange={setAvatarOpen}>
              <PopoverTrigger asChild>
                <button className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all">
                  <User className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent side="right" align="center" className="w-48 p-2 text-sm">
                <Link
                  to="/"
                  onClick={() => setAvatarOpen(false)}
                  className="block px-2 py-1.5 rounded-md text-foreground hover:bg-muted cursor-pointer transition-colors"
                >
                  Sign in
                </Link>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-[#1a1917]/90 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1.5 shadow-2xl">
        {navItems.map(renderMobileItem)}
      </nav>
    </>
  );
};

export default GlobalSidebar;
