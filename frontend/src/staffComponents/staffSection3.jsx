import React, { useState } from "react";

export default function StaffSection3() {
  const [formData, setFormData] = useState({
    hostelName: "",
    noStudents: "",
    weekStart: "",
    weekEnd: "",
    noClothes: "",
    totalAmount: "",
    status: "Pending",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const staffEmail = localStorage.getItem("userEmail"); // staff email
    console.log({ ...formData, staffEmail });
    // 👉 send data to backend API here
  };

  return (
    <section className="Section3">
      <h2>Create Weekly Report</h2>
      <div className="weekly-report">
        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Hostel Name</label>
              <input
                type="text"
                name="hostelName"
                value={formData.hostelName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>No. of Students</label>
              <input
                type="number"
                name="noStudents"
                value={formData.noStudents}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Weekly Pickup Date</label>
              <input
                type="date"
                name="weekStart"
                value={formData.weekStart}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Weekly Drop Date</label>
              <input
                type="date"
                name="weekEnd"
                value={formData.weekEnd}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>No. of Clothes</label>
              <input
                type="number"
                name="noClothes"
                value={formData.noClothes}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Total Amount</label>
              <input
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Remarks (Optional)</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
