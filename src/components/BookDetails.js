import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Card } from "react-bootstrap";
import StarRaiting from "./StarRaiting";

export default function BookDetails({ booksList }) {
  const { book_id } = useParams();

  // why code 13-21 doesnt work? Catch blocks returns error

  // const getBook = async () => {
  //   const q = query(colRef, where("id", "==", book_id));
  //   try {
  //     const docSnap = await getDoc(q);
  //     console.log(docSnap.data());
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <>
      {booksList
        ?.filter((book) => book.id === book_id)
        .map((book, index) => (
          <Card
            key={`${book.id}-${index}`}
            style={{
              border: "none",
              borderRadius: "0",
              height: "100%",
              backgroundColor: "rgb(65,66,70)",
              background:
                "linear-gradient(180deg, rgba(65,66,70,1) 0%, rgba(43,43,43,1) 47%, rgba(29,29,29,1) 100%)",
            }}
            className="text-center text-black"
          >
            <Card.Body className="d-flex flex-row text-white" key={book.id}>
              <Card.Img
                src={book.img}
                variant="top"
                style={{ width: "14rem", height: "20rem", marginLeft: "10%" }}
              />
              <Card.Body style={{ marginRight: "10%" }}>
                <Card.Title>{book.title}</Card.Title>
                <Card.Title>{book.author}</Card.Title>
                <Card.Title>{book.type}</Card.Title>
                <Card.Text>{book.description}</Card.Text>
                <Card.Text style={{ marginTop: "25px" }}>
                  Oceń książkę
                </Card.Text>
                <StarRaiting book_id={book_id} />
                <Button style={{ marginTop: "12px" }}>Dodaj Ocenę</Button>
              </Card.Body>
            </Card.Body>
          </Card>
        ))}
    </>
  );
}
