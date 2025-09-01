import React from "react";
import { Link } from "react-router-dom";

export default function UserSection2() {
  return (
    <div>
      <h2>Section2</h2>
      <button>
        <Link to="/clothSubmit">
          <p>Submit Cloth Design</p>
        </Link>
      </button>
    </div>
  );
}
