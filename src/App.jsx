import GlobalSidebar from "./components/custom/GlobalSidebar";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <GlobalSidebar />
      <Outlet />
    </div>
  );
}
