import React, { useState } from "react";
import { doc, query, updateDoc, where } from "firebase/firestore";
import { colRef } from "../firebase/firebase";
import { FaStar } from "react-icons/fa";

const StarRaiting = async ({ book_id }) => {
  const [raiting, setRaiting] = useState(null);
  const [hover, setHover] = useState(null);

  // const docRef = doc(colRef, where("id", "==", book_id));

  // const raitingHandler = await updateDoc(docRef, {
  //   raiting: raiting,
  // });

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const raitingValue = i + 1;
        return (
          <label key={i}>
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
