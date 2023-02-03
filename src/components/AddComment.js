import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = ({ addComment, comment, setComment }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };
  return (
    <div>
      <Form>
        <Form.Label>Dodaj Komentarz</Form.Label>
        <textarea
          onChange={handleChange}
          value={comment}
          className="form-control"
          type="textArea"
          rows="6"
          required
        />
        <Button type="submit" onSubmit={addComment}>
          Prześlij
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
