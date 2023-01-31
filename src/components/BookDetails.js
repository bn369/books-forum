import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import { Alert, Card } from "react-bootstrap";
import StarRaiting from "./StarRaiting";
import { useBookLoadable } from "./useBookLoadable";
import { Loading } from "./Loading";
import AddComment from "./AddComment";

export default function BookDetails() {
  const { book_id } = useParams();

  const { book, isLoading, isUpdating, error, update } =
    useBookLoadable(book_id);

  const [comment, setComment] = useState(undefined);

  const setRating = useCallback(
    (rating) => {
      update({ rating });
    },
    [update]
  );

  const addComment = useCallback(
    (comment) => {
      update({ comments: comment });
    },
    [update]
  );

  if (isLoading && book == null) {
    return <Loading centered />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <Card
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
        <Card.Body className="d-flex flex-row text-white">
          <Card.Body>
            <Card.Img
              src={book.img}
              variant="top"
              style={{ width: "14rem", height: "20rem", marginLeft: "10%" }}
            />
            <Card.Body style={{ marginLeft: "10%" }}>
              <Card.Text>Oceń książkę</Card.Text>
              <StarRaiting
                disabled={isLoading || isUpdating}
                rating={book.rating ?? 0}
                setRaiting={setRating}
              />
            </Card.Body>
          </Card.Body>
          <Card.Body style={{ marginRight: "10%" }}>
            <Card.Title>{book.title}</Card.Title>
            <Card.Title>{book.author}</Card.Title>
            <Card.Title>{book.type}</Card.Title>
            <Card.Text>{book.description}</Card.Text>
            <AddComment
              addComment={addComment}
              comment={comment}
              setComment={setComment}
            />
            <Card.Text>{book.comments}</Card.Text>
          </Card.Body>
        </Card.Body>
      </Card>
    </>
  );
}
