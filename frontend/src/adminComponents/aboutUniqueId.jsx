import React from "react";
import { Link } from "react-router-dom";

export default function AboutUniqueId() {
  return (
    <section className="about-uniqueid">
      <div className="uniqueid-section">
        <h2 className="uniqueid-title">What is Unique Id</h2>
        <div className="uniqueid-box">
          <p>
            A Unique ID, or Unique Identifier, is a distinctive string of
            characters assigned to a single entity to ensure it can be uniquely
            identified within our DormDrop system. This applies to every user,
            from students submitting their laundry to the staff members who
            process it and the administrators who oversee operations. This ID is
            algorithmically generated to be completely distinct, meaning no two
            users will ever share the same identifier. This prevents any
            confusion or data mix-ups, such as one student's laundry order being
            assigned to another. We use a standard like the Universally Unique
            Identifier (UUID) to generate a 128-bit number that is, for all
            practical purposes, unique across our entire platform. In our
            database, this Unique ID acts as the primary key. For a student, it
            links their account to their laundry submissions, payment history,
            and tracking information. For a staff member, it connects them to
            the laundry batches they are assigned, their work history, and
            payment records. Unlike a name or email address, which might change,
            the Unique ID is a permanent and stable reference point, ensuring we
            can accurately manage every piece of laundry and every transaction
            from drop-off to delivery.
          </p>
        </div>
      </div>

      <div className="uniqueid-section">
        <h2 className="uniqueid-title">Importance of Unique Id</h2>
        <div className="uniqueid-box">
          <p>
            The importance of a Unique ID cannot be overstated, especially in a
            system that manages sensitive and critical data. Unique IDs are
            fundamental for maintaining data integrity and consistency. They
            eliminate ambiguity by providing a single, authoritative identifier
            for each record, which is crucial for tracking users, staff members,
            or processes without the risk of duplication. This makes it easy to
            manage large datasets reliably and perform operations like
            searching, sorting, and linking related information across different
            tables or databases. For security, Unique IDs play a vital role.
            They allow for precise access control and auditing. By associating
            permissions and logging activities with a non-reassignable Unique
            ID, we can ensure that only authorized individuals can access or
            modify specific data, and we can maintain a clear, auditable trail
            of all actions performed. This is far more secure than relying on
            mutable information like email addresses, which can be compromised
            or changed.
          </p>
        </div>
      </div>

      <div className="uniqueid-section">
        <h2 className="uniqueid-title">Process of Deleting Unique Id</h2>
        <div className="uniqueid-box">
          <p>
            In the DormDrop system, you cannot directly delete your own Unique
            ID, and this restriction is a critical security and data integrity
            measure. A Unique ID is not just a username; it is the central
            thread connecting all of your activity and history within our
            platform. Attempting to delete it would trigger a cascade of data
            loss that could be catastrophic for both the user and the
            operational integrity of our service. For instance, if a student's
            Unique ID were deleted, all their past and current laundry
            submissions, payment history, and any active tracking data would be
            permanently erased and disconnected from our system. This would make
            it impossible to track an in-progress order or resolve a payment
            dispute. If a staff member's ID were removed, their entire work
            history, assigned laundry batches, and payment records would vanish,
            making it impossible to process payroll or track accountability for
            the items in their care. Similarly, deleting an admin's ID could
            corrupt system logs and configurations vital for the platform's
            operation. This irreversible data loss would not only disrupt our
            services but also violate data retention policies required for
            financial and operational auditing. Because of these significant
            consequences, we have implemented a formal, manual process for
            account deletion that requires direct intervention from our support
            team. To initiate a deletion, you must contact DormDrop support and
            provide a valid, verifiable reason for your request, such as
            graduating from the university or ending your employment with us.
            Our team will first verify your identity to prevent unauthorized
            deletions. Then, they will carefully assess the dependencies
            associated with your Unique ID. This process is not an instantaneous
            "hard delete." Instead, it is a managed procedure where critical
            historical data, such as financial transaction records, is securely
            archived to comply with legal and financial á regulations. Other
            associated data may be anonymized to remove personal identifiers
            while preserving non-critical historical context. Only after these
            steps are completed will the active record be permanently purged
            from our live systems. This deliberate, audited process ensures that
            we can honor your request, such as the "right to be forgotten" under
            GDPR, without compromising the stability, security, and historical
            integrity of the entire DormDrop ecosystem for all other users. It
            protects everyone by ensuring that data, which is interconnected, is
            handled responsibly and with full traceability, preventing
            accidental or malicious data destruction that could impact the wider
            community.
          </p>
        </div>
      </div>

      <footer className="uniqueid-footer">
        <Link to="/aboutUs" className="footer-link">
          Help
        </Link>
        <Link to="/aboutUs" className="footer-link">
          Contact
        </Link>
      </footer>
    </section>
  );
}
