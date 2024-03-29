import { useEffect, useMemo, useState } from "react";
import { getDocs } from "firebase/firestore";
import { colRef } from "../../firebase/firebase";
import { Card, Button, Alert } from "react-bootstrap";
import { Loading } from "../actions-for-users/Loading";
import { useNavigate } from "react-router-dom";
import { ALL_BOOKS } from "../../globals";
import StarRatingProvider from "../star-rating/StarRatingProvider";

export default function StartPage({ filterByType, booksList, setBooksList }) {
  const [error, setError] = useState(undefined);
  const isLoading = booksList == null && error == null;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("init", filterByType);
    return () => {
      console.log("deinit");
    };
  }, [filterByType]);

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

  const filteredBooks = useMemo(() => {
    const byType =
      filterByType === ALL_BOOKS
        ? booksList
        : booksList?.filter((book) => book.type === filterByType);
    return byType?.sort((a, b) => (b?.rating ?? 0) - (a?.rating ?? 0));
  }, [booksList, filterByType]);

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
          {filteredBooks?.map((book, index) => (
            <Card
              key={`${book.id}-${index}`}
              style={{
                border: "none",
                height: "22rem",
                width: "80%",
                margin: "auto",
              }}
              className="text-center text-black"
            >
              <Card.Body className="d-flex flex-row" key={book.id}>
                <Card.Img
                  src={book.img}
                  variant="top"
                  style={{ width: "14rem", height: "20rem" }}
                />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Title>{book.author}</Card.Title>
                  <Card.Title>{book.type}</Card.Title>
                  <StarRatingProvider book={book} />
                  <Card.Text
                    style={{
                      height: "8rem",
                      padding: "5px",
                      overflow: "hidden",
                      borderRadius: "5px",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 10px 12px",
                    }}
                  >
                    {book.description}
                  </Card.Text>
                  <Button
                    onClick={() => navigate(`book/${book.id}`)}
                    style={{
                      marginBottom: "1rem",
                    }}
                  >
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
