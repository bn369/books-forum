import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
// import { UserAuth } from "../context/AuthContext";

const stars5 = [1, 2, 3, 4, 5];

export default function StarRating({ rating, setRating, disabled }) {
  const [hover, setHover] = useState(null);

  // const { user } = UserAuth();

  // const stars = {
  //   rating: rating,
  //   user: user.email
  // }

  return (
    <div
      style={{
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {stars5.map((ratingValue) => (
        <label key={ratingValue}>
          <input
            type="radio"
            name="rating"
            value={ratingValue}
            style={{ display: "none" }}
            onClick={() => {
              setRating(ratingValue);
              console.log(ratingValue);
            }}
          />
          <FaStar
            size={22}
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#6f6f70"}
            style={{ cursor: "pointer", marginRight: "3px" }}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          />
        </label>
      ))}
    </div>
  );
}
