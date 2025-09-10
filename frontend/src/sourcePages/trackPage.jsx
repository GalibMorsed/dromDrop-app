import React from "react";
import TrackNav from "../userComponents/trackClothComponents/trackNav";
import TrackSection1 from "../userComponents/trackClothComponents/trackSection1";
import TrackSection2 from "../userComponents/trackClothComponents/trackSection2";
import TrackSection3 from "../userComponents/trackClothComponents/trackSection3";

export default function TrackPage() {
  return (
    <div>
      <TrackNav />
      <TrackSection1 />
      <TrackSection2 />
      <TrackSection3 />
    </div>
  );
}

// This is the page for tracking cloth, which includes the navigation bar and three sections.
