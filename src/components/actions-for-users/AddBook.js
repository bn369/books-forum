import React, { useState } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import { colRef } from "../../firebase/firebase";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import FileUploader from "./FileUploarder";
import { bookTypes } from "../../globals";

export default function AddBook() {
  const navigate = useNavigate();
  const [fileInProgress, setFileInProgress] = useState(false);
  const [fileUrl, setFileUrl] = useState(undefined);

  const [title, setTitle] = useState(undefined);
  const [author, setAuthor] = useState(undefined);
  const [type, setType] = useState(undefined);
  const [description, setDescription] = useState(undefined);

  const [validated, setValidated] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const addBookHandler = async (e) => {
    const form = e.currentTarget;
    setValidated(true);
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    const document = {
      id: new Date().getTime(),
      img: fileUrl,
      comments: [],
      title,
      author,
      type,
      description,
    };

    try {
      setIsUploading(true);
      await addDoc(colRef, document);
      navigate("/");
    } catch (e) {
      console.warn(`addDoc exception ${e}`);
      //TODO show error to the User
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card style={{ border: "none" }}>
      <Card.Body
        className="text-center text-white"
        style={{
          backgroundColor: "rgb(65,66,70)",
          background:
            "linear-gradient(180deg, rgba(65,66,70,1) 0%, rgba(43,43,43,1) 47%, rgba(29,29,29,1) 100%)",
        }}
      >
        <h2 className="text-center mb-4">Dodaj nową książkę</h2>
        <Form
          className="w-50 m-auto"
          onSubmit={addBookHandler}
          style={{ height: "100vh", minWidth: "250px" }}
          noValidate
          validated={validated}
        >
          <Form.Group id="title">
            <Form.Label>Tytuł</Form.Label>
            <Form.Control
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tytuł"
            />
          </Form.Group>
          <Form.Group id="author">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Autor"
            />
          </Form.Group>
          <Form.Group id="type">
            <Form.Label>Gatunek</Form.Label>
            <Form.Control
              as="select"
              type="select"
              value={type}
              onChange={(event) => setType(event.target.value)}
              required
            >
              <option value={""}>Wybierz...</option>
              {bookTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group id="description">
            <Form.Label>Opis</Form.Label>
            <textarea
              className="form-control"
              type="textArea"
              rows="6"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group id="image">
            <Form.Label>Okładka</Form.Label>
            <FileUploader
              setFileUrl={setFileUrl}
              fileInProgress={fileInProgress}
              setFileInProgress={setFileInProgress}
            />
          </Form.Group>
          <Button
            className="mt-2"
            type="submit"
            disabled={isUploading || fileInProgress}
          >
            {isUploading && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            Zatwierdź
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
