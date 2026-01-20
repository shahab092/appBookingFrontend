import React, { useEffect } from "react";
import Header from "../../componenets/landingpage/Header";
import Hero from "../../componenets/landingpage/Hero";
import About from "../../componenets/landingpage/About";
import Services from "../../componenets/landingpage/Services";
import Doctors from "../../componenets/landingpage/Doctors";
import Testimonials from "../../componenets/landingpage/Testimonials";
import CTA from "../../componenets/landingpage/CTA";
import Footer from "../../componenets/landingpage/Footer";
import TopBar from "../../componenets/landingpage/TopBar";
import BookingSection from "../../componenets/landingpage/BookingSection";
import HealthHeader from "../../componenets/landingpage/HealthHeader";
import AskDoctorBanner from "../../componenets/landingpage/AskDoctorBanner";
import HeroSection from "../../componenets/landingpage/HeroSection";
import AppBanner from "../../componenets/landingpage/AppBanner";

export default function Landing() {
  // Enable smooth scrolling for anchor links
  useEffect(() => {
    // Add smooth scroll behavior to the document
    document.documentElement.style.scrollBehavior = "smooth";

    // Handle anchor link clicks
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for sticky header
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    };

    // Add event listeners to all anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleAnchorClick);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopBar />
      <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative">
        <HealthHeader />

        <HeroSection />

        <AskDoctorBanner />
        <AppBanner />
        {/* <Doctors /> */}
        <BookingSection />
        <Testimonials />
        {/* <CTA /> */}
        <Footer />
      </main>
    </div>
  );
}
