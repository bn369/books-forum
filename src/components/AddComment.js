import React from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = ({ addComment, comment, setComment }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
    console.log(comment);
  };
  return (
    <div>
      <Form onSubmit={addComment}>
        <Form.Label>Dodaj Komentarz</Form.Label>
        <textarea
          onChange={handleChange}
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
