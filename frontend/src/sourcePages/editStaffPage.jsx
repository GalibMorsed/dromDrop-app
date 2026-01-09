import React, { useState, useEffect } from "react";
import EditStaffNav from "../adminComponents/editStaffComponents/editStaffNav";
import EditStaffSection1 from "../adminComponents/editStaffComponents/editStaffSection1";
import EditStaffSection2 from "../adminComponents/editStaffComponents/editStaffSection2";

export default function EditStaffPage() {
  const [staffs, setStaffs] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminEmail = localStorage.getItem("userEmail");

    if (!adminEmail) {
      console.error("Admin email not found in localStorage");
      return;
    }

    const fetchStaffs = async () => {
      try {
        const res = await fetch(
          `https://dromdrop.jiteshroy2207.workers.dev/auth/getCreatedStaffs?adminEmail=${adminEmail}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setStaffs(data.staffs || []);
        } else {
          console.error("Error fetching staffs:", data.message);
        }
      } catch (err) {
        console.error("Error fetching staffs:", err);
      }
    };

    const fetchActivities = async () => {
      try {
        const res = await fetch(
          `https://dromdrop.jiteshroy2207.workers.dev/auth/getActivities?adminEmail=${adminEmail}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (res.ok) {
          const staffActivities = (data.staffs || []).map((staff) => ({
            ...staff,
            role: "Staff",
          }));
          const userActivities = (data.users || []).map((user) => ({
            ...user,
            role: user.role || "Student/User",
          }));
          const combinedActivities = [...staffActivities, ...userActivities];
          setActivities(combinedActivities);
        } else {
          console.error("Error fetching activities:", data.message);
        }
      } catch (err) {
        console.error("Error fetching activities:", err);
      }
    };

    fetchStaffs();
    fetchActivities();
  }, []);

  return (
    <div>
      <EditStaffNav staffCount={staffs.length} />
      <EditStaffSection1 staffs={staffs} setStaffs={setStaffs} />
      <EditStaffSection2 activities={activities} />
    </div>
  );
}
