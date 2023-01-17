import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDocs, getDoc, query, where } from "firebase/firestore";
import { colRef } from "../firebase/firebase";
import { Button } from "react-bootstrap";

export default function BookDetails() {
  const { book_id } = useParams();
  const [book, setBook] = useState({});

  const getBook = async () => {
    const q = query(colRef, where("id", "==", book_id));
    try {
      const docSnap = await getDoc(q);
      console.log(docSnap.data());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {book.title}
      <Button onClick={getBook}>test</Button>
    </>
  );
}
