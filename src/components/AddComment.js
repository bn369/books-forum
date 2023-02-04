import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = ({ addComment }) => {
  const [comment, setComment] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(comment);
    setComment("");
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Label>Dodaj Komentarz</Form.Label>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          className="form-control"
          type="textArea"
          rows="6"
          required
        />
        <Button type="submit">Prześlij</Button>
      </Form>
    </div>
  );
};

export default AddComment;
