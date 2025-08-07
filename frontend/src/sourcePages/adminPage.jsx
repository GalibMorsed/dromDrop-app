import React from "react";
import AdminNav from "../adminComponents/adminNav";
import AdminSection1 from "../adminComponents/adminSection1";
import AdminSection2 from "../adminComponents/adminSection2";
import AdminSection3 from "../adminComponents/adminSection3";
import AdminSection4 from "../adminComponents/adminSection4";

export default function AdminPage() {
  return (
    <div>
      <AdminNav />
      <AdminSection1 />
      <AdminSection2 />
      <AdminSection3 />
      <AdminSection4 />
    </div>
  );
}
