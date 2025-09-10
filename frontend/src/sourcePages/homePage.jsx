import React from "react";
import Section1 from "../homeComponents/homeSection1";
import Section2 from "../homeComponents/homeSection2";
import Section3 from "../homeComponents/homeSection3";
import Section4 from "../homeComponents/homeSection4";
import Section5 from "../homeComponents/homeSection5";
import Footer from "../homeComponents/homeFooter";

export default function HomePage() {
  return (
    <div>
      <Section1 id="section1" />
      <Section2 id="section2" />
      <Section3 id="section3" />
      <Section4 id="section4" />
      <Section5 id="section5" />
      <Footer />
    </div>
  );
}

// This is the home page component that assembles various sections of the homepage.
// It includes five main sections and a footer, each imported from their respective files.
// The sections are organized in a vertical layout within a single div container.
// Each section is assigned a unique ID for potential navigation or styling purposes.
// The component is exported as the default export for use in other parts of the application.
