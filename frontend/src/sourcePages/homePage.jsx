import React from "react";
import HomeNav from "../homeComponents/homeNav";
import Section1 from "../homeComponents/homeSection1";
import Section2 from "../homeComponents/homeSection2";
import Section3 from "../homeComponents/homeSection3";
import Section4 from "../homeComponents/homeSection4";
import Section5 from "../homeComponents/homeSection5";
import Footer from "../homeComponents/homeFooter";

export default function HomePage() {
  return (
    <div>
      <HomeNav />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Footer />
    </div>
  );
}
