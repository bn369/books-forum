import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { colRef } from "../firebase/firebase";
import { Card, Button, Alert } from "react-bootstrap";
import { Loading } from "./Loading";
import { useNavigate } from "react-router-dom";

export default function StartPage({ filterByType, booksList, setBooksList }) {
  const [error, setError] = useState(undefined);
  const isLoading = booksList == null && error == null;
  const navigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await getDocs(colRef);
        setBooksList(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      } catch (e) {
        console.warn(`Fetch books exception ${e}`);
        setError(e);
      }
    };
    getBooks();
  }, []);
  console.log(filterByType);

  return (
    <div
      style={{
        padding: "20px 5vw 20px 5vw",
        background:
          "linear-gradient(180deg, rgba(65,66,70,1) 0%, rgba(43,43,43,1) 47%, rgba(29,29,29,1) 100%)",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      {isLoading && <Loading centered />}
      {!error ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 10,
          }}
        >
          {booksList
            ?.filter((book) => {
              if (filterByType === "Wszystkie") return book;
              else return book.type === filterByType;
            })
            .map((book, index) => (
              <Card
                key={`${book.id}-${index}`}
                style={{
                  border: "none",
                  height: "100%",
                  // backgroundColor: "rgb(65,66,70)",
                  // background:
                  //   "linear-gradient(180deg, rgba(65,66,70,1) 0%, rgba(43,43,43,1) 47%, rgba(29,29,29,1) 100%)",
                }}
                className="text-center text-black"
              >
                <Card.Body className="d-flex flex-row" key={book.id}>
                  <Card.Img
                    src={book.img}
                    variant="top"
                    style={{ width: "14rem" }}
                  />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Title>{book.author}</Card.Title>
                    <Card.Title>{book.type}</Card.Title>
                    <Card.Text>{book.description}</Card.Text>
                    <Button onClick={() => navigate(`book/${book.id}`)}>
                      Czytaj Więcej
                    </Button>
                  </Card.Body>
                </Card.Body>
              </Card>
            ))}
        </div>
      ) : (
        <Alert variant="danger">{error}</Alert>
      )}
    </div>
  );
}
