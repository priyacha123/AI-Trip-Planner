// import { Outlet } from 'react-router-dom'
// import './App.css'
// import Header from './components/custom/Header'

// function App() {

//   return (
//     <>
//     <Header />
//     {/* <Toaster /> */}
//     {/* <Hero /> */}
//     <Outlet />
//     </>
//   )
// }

// export default App


import Navbar from "./components/custom/Navbar";
import Hero from "./components/custom/Hero";
import DestinationMarquee from "./components/custom/DestinationMarquee";
import Stats from "./components/custom/Stats";
import HowItWorks from "./components/custom/HowItWorks";
import Features from "./components/custom/Features";
import Contact from "./components/custom/Contact";
import Footer from "./components/custom/Footer";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <Navbar />
      <Outlet />
      <main>
        {/* <Hero /> */}
        {/* <DestinationMarquee />
        <Stats />
        <HowItWorks />
        <Features />
        <Contact /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
