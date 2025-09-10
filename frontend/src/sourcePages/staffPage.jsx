import React from "react";
import StaffNav from "../staffComponents/staffNav";
import StaffSection1 from "../staffComponents/staffSection1";
import StaffSection2 from "../staffComponents/staffSection2";
import StaffSection3 from "../staffComponents/staffSection3";
import StaffSection4 from "../staffComponents/staffSection4";

export default function StaffPage() {
  return (
    <div>
      <StaffNav />
      <StaffSection1 />
      <StaffSection2 />
      <StaffSection3 />
      <StaffSection4 />
    </div>
  );
}

// The StaffPage component imports and uses various staff-related components to build the staff page layout, similar to how HomePage and AdminPage are structured.
