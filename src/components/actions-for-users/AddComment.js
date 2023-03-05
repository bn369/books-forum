import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { UserAuth } from "../../context/AuthContext";

const AddComment = ({ addComment }) => {
  const [content, setContent] = useState(undefined);

  const { user } = UserAuth();

  const comment = {
    content,
    createdBy: user.email,
    date: new Date().toLocaleString(),
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(comment);
    console.log(content);
    setContent("");
    console.log(comment.createdBy);
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Label>Dodaj Komentarz</Form.Label>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className="form-control"
          type="textArea"
          rows="6"
          required
        />
        <Button type="submit" style={{ marginTop: "10px" }}>
          Prześlij
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
