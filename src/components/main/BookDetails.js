import { useCallback } from "react";
import { useParams } from "react-router-dom";

import { Alert, Button, Card } from "react-bootstrap";
import StarRating from "../actions-for-users/StarRating";
import { useBookLoadable } from "../hooks/useBookLoadable";
import { Loading } from "../actions-for-users/Loading";
import AddComment from "../actions-for-users/AddComment";
import { AuthProvider, UserAuth } from "../../context/AuthContext";

export default function BookDetails({ setModal }) {
  const { book_id } = useParams();
  const { user } = UserAuth();

  const { book, isLoading, isUpdating, error, update } =
    useBookLoadable(book_id);

  const setRating = useCallback(
    (rating) => {
      update({ rating });
    },
    [update]
  );

  const addComment = useCallback(
    (comment) => {
      update({ comments: [...(book?.comments ?? []), comment] });
    },
    [book?.comments, update]
  );

  if (isLoading && book == null) {
    return <Loading centered />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <AuthProvider>
      <Card
        style={{
          border: "none",
          borderRadius: "0",
          height: "100%",
          minHeight: "100vh",
          backgroundColor: "rgb(65,66,70)",
          background:
            "linear-gradient(180deg, rgba(65,66,70,1) 0%, rgba(43,43,43,1) 47%, rgba(29,29,29,1) 100%)",
        }}
        className="text-center text-black"
      >
        <Card.Body className="d-flex flex-row text-white">
          <Card.Body>
            <Card.Img
              src={book.img}
              variant="top"
              style={{ width: "14rem", height: "20rem" }}
            />
            {user ? (
              <Card.Body style={{ marginLeft: "10%" }}>
                <Card.Text>Oceń książkę</Card.Text>
                <StarRating
                  disabled={isLoading || isUpdating}
                  rating={book.rating ?? 0}
                  setRating={setRating}
                />
              </Card.Body>
            ) : (
              <Card.Body>
                <Card.Text
                  style={{
                    fontSize: "20px",
                    marginTop: "10%",
                    borderTop: "2px solid black",
                    paddingTop: "10%",
                  }}
                >
                  Zaloguj się aby ocenić książkę i dodać komentarz!
                </Card.Text>
                <Button onClick={() => setModal(true)}>Zaloguj</Button>
              </Card.Body>
            )}
          </Card.Body>
          <Card.Body style={{ marginRight: "10%", marginLeft: "5%" }}>
            <Card.Title>{book.title}</Card.Title>
            <Card.Title>{book.author}</Card.Title>
            <Card.Title>{book.type}</Card.Title>
            <Card.Text style={{ marginBottom: "90px" }}>
              {book.description}
            </Card.Text>
            {user && <AddComment addComment={addComment} />}
            <Card.Body style={{ padding: "0" }}>
              {book.comments?.map((comm, i) => (
                <Card.Body
                  key={i}
                  style={{
                    border: "2px solid black",
                    borderRadius: "5px",
                    marginTop: "10px",
                    backgroundColor: "#122335",
                    padding: "0",
                  }}
                >
                  <Card.Body
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: "0",
                      borderBottom: "1px solid black",
                      paddingBottom: "0",
                    }}
                  >
                    <Card.Text>{comm.createdBy}</Card.Text>
                    <Card.Text>{comm.date}</Card.Text>
                  </Card.Body>
                  <Card.Text style={{ padding: "20px" }}>
                    {comm.content}
                  </Card.Text>
                </Card.Body>
              ))}
            </Card.Body>
          </Card.Body>
        </Card.Body>
      </Card>
    </AuthProvider>
  );
}
