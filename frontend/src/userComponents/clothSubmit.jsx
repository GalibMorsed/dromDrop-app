import React from "react";

export default function ClothSubmit() {
  return (
    <div>
      <h2>Submit Your Cloth Design</h2>
      <form>
        <label htmlFor="designName">Design Name:</label>
        <input type="text" id="designName" name="designName" required />

        <label htmlFor="designDescription">Description:</label>
        <textarea id="designDescription" name="designDescription" required />

        <label htmlFor="designImage">Upload Image:</label>
        <input
          type="file"
          id="designImage"
          name="designImage"
          accept="image/*"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
