import React from "react";
import UserNav from "../userComponents/userNav";
import UserSection1 from "../userComponents/userSection1";
import UserSection2 from "../userComponents/userSection2";
import UserSection3 from "../userComponents/userSection3";
import UserFooter from "../userComponents/userFooter";

export default function StudentPage() {
  return (
    <div>
      <UserNav />
      <UserSection1 />
      <UserSection2 />
      <UserSection3 />
      <UserFooter />
    </div>
  );
}

// This is the student page component that includes navigation, sections, and footer for students.
