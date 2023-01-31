import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const stars5 = [1, 2, 3, 4, 5];

export default function StarRaiting({ rating, setRaiting, disabled }) {
  const [hover, setHover] = useState(null);

  return (
    <div
      style={{
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {stars5.map((raitingValue) => (
        <label key={raitingValue}>
          <input
            type="radio"
            name="raiting"
            value={raitingValue}
            style={{ display: "none" }}
            onClick={() => {
              setRaiting(raitingValue);
              console.log(raitingValue);
            }}
          />
          <FaStar
            size={22}
            color={raitingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            style={{ cursor: "pointer", marginRight: "3px" }}
            onMouseEnter={() => setHover(raitingValue)}
            onMouseLeave={() => setHover(null)}
          />
        </label>
      ))}
    </div>
  );
}
