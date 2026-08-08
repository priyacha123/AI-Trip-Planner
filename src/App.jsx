import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import GlobalSidebar from "./components/custom/GlobalSidebar";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <ScrollToTop />
      <GlobalSidebar />
      <Outlet />
    </div>
  );
}
