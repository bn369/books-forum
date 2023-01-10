import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { colRef } from "../firebase/firebase";
import { Card, Button } from "react-bootstrap";

const StartPage = () => {
  const [booksList, setBooksList] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const data = await getDocs(colRef);
      setBooksList(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getBooks();
  }, []);

  return (
    <Card
      style={{
        border: "none",
        height: "100%",
        backgroundColor: "rgb(65,66,70)",
        background:
          "linear-gradient(180deg, rgba(65,66,70,1) 0%, rgba(43,43,43,1) 47%, rgba(29,29,29,1) 100%)",
      }}
      className="text-center text-white"
    >
      <Card.Body>
        {booksList.map((book) => {
          return (
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
                <Button>Czytaj Więcej</Button>
              </Card.Body>
            </Card.Body>
          );
        })}
      </Card.Body>
    </Card>
  );
};

export default StartPage;
