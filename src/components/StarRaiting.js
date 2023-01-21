import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { FaStar } from "react-icons/fa";

const StarRaiting = () => {
  const [raiting, setRaiting] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const raitingValue = i + 1;
        return (
          <label>
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
              color={raitingValue <= (hover || raiting) ? "#ffc107" : "#e4e5e9"}
              style={{ cursor: "pointer", marginRight: "3px" }}
              onMouseEnter={() => setHover(raitingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRaiting;
