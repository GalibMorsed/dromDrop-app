import React, { useEffect, useState } from "react";

export default function UserSection3() {
  const [dropReports, setDropReports] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetch(
      `http://localhost:6060/submission/submittedCloth?userEmail=${userEmail}`
    )
      .then((res) => res.json())
      .then((data) => {
        const reports = Array.isArray(data) ? data : data ? [data] : [];

        const mappedReports = reports.map((report) => {
          const laundryCount =
            report.clothes?.filter((c) => c.status === "Laundry").length || 0;
          const extraCount =
            report.clothes?.filter((c) => c.status === "Extra").length || 0;

          const allClothes =
            report.clothes?.map((c) => c.clothName).join(", ") || "-";

          return {
            dropDate: report.date,
            laundryCount,
            extraCount,
            allClothes,
            notes: report.notes || "Submitted",
          };
        });

        const sortedReports = mappedReports.sort(
          (a, b) => new Date(b.dropDate) - new Date(a.dropDate)
        );
        setDropReports(sortedReports);
        setExpandedRows(Array(sortedReports.length).fill(false));
      })
      .catch((err) => console.error("Error fetching drop reports:", err));
  }, [userEmail]);

  const handleToggleRow = (idx) => {
    setExpandedRows((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  return (
    <div className="user-section3">
      <h2 className="usec3-title">📋 Drop Report History</h2>

      {dropReports.length === 0 ? (
        <p className="no-reports">No drop reports available.</p>
      ) : (
        <div className="table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Laundry Cloth Count</th>
                <th>Extra Cloth Count</th>
                <th>Clothes Types</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dropReports.map((report, idx) => {
                const showAllClothes = expandedRows[idx];
                return (
                  <tr key={idx}>
                    <td>
                      {report.dropDate
                        ? new Date(report.dropDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>{report.laundryCount}</td>
                    <td>{report.extraCount}</td>
                    <td>
                      {showAllClothes
                        ? report.allClothes
                        : report.allClothes.split(", ")[0]}
                      {report.allClothes.split(", ").length > 1 && (
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            color: "#0e5292ff",
                            cursor: "pointer",
                            padding: "0",
                            marginLeft: "5px",
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                          onClick={() => handleToggleRow(idx)}
                        >
                          {showAllClothes ? "less" : "See all"}
                        </button>
                      )}
                    </td>
                    <td>{report.notes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
