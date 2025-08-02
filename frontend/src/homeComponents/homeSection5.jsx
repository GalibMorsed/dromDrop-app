// HomeSection5.jsx
import React from "react";

export default function HomeSection5() {
  return (
    <div>
      <section className="section5">
        <div className="section5-container">
          <h2>Why Choose DormDrop?</h2>
          <p>
            Discover why DormDrop is the smarter choice for students and
            hostels. We make laundry management simple, transparent, and
            stress-free.
          </p>

          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Features</th>
                  <th>DormDrop</th>
                  <th>Traditional Laundry</th>
                  <th>Self-Service</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Weekly Pickups Scheduled</td>
                  <td className="check">✔</td>
                  <td className="cross">✖</td>
                  <td className="sometimes">Sometimes</td>
                </tr>
                <tr>
                  <td>No Extra Hidden Charges</td>
                  <td className="check">✔</td>
                  <td className="cross">✖</td>
                  <td className="cross">✖</td>
                </tr>
                <tr>
                  <td>Track Clothes Online</td>
                  <td className="check">✔</td>
                  <td className="cross">✖</td>
                  <td className="cross">✖</td>
                </tr>
                <tr>
                  <td>Affordable Student Pricing</td>
                  <td className="check">✔</td>
                  <td className="sometimes">Sometimes</td>
                  <td className="cross">✖</td>
                </tr>
                <tr>
                  <td>Time-Saving & Hassle-Free</td>
                  <td className="check">✔</td>
                  <td className="cross">✖</td>
                  <td className="sometimes">Sometimes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button className="sec5-cta-btn">Get Started with DormDrop →</button>
        </div>
      </section>
    </div>
  );
}
