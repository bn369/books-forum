import React, { useEffect, useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { colRef } from "../firebase/firebase";
import { addDoc } from "firebase/firestore";
import { storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddBook = () => {
  const titleRef = useRef();
  const authorRef = useRef();
  const descriptionRef = useRef();
  const typeRef = useRef();
  const imageRef = useRef();

  const [bookType, setBookType] = useState("");
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    title: "",
    author: "",
    type: "",
    description: "",
    url: "",
    id: "",
    raiting: null,
    comments: [],
  });

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const imageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(imageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  const clearForm = () => {
    titleRef.current.value = "";
    authorRef.current.value = "";
    descriptionRef.current.value = "";
    imageRef.current.value = null;
    setBookType("Wybierz...");
  };

  const addBookHandler = async (e) => {
    e.preventDefault();
    console.log(file);
    setData((prev) => ({
      ...prev,
      title: titleRef.current.value,
      author: authorRef.current.value,
      type: typeRef.current.value,
      description: descriptionRef.current.value,
      id: new Date().getTime(),
    }));
    try {
      await addDoc(colRef, data);
      alert("Dodano książkę");
      console.log(colRef);
      console.log(file);
      clearForm();
    } catch (err) {
      console.log(err);
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
        >
          <Form.Group id="title">
            <Form.Label>Tytuł</Form.Label>
            <Form.Control type="text" ref={titleRef} required />
          </Form.Group>
          <Form.Group id="author">
            <Form.Label>Autor</Form.Label>
            <Form.Control type="text" ref={authorRef} required />
          </Form.Group>
          <Form.Group id="type">
            <Form.Label>Gatunek</Form.Label>
            <select
              id="inputType"
              className="form-control"
              ref={typeRef}
              value={bookType}
              onChange={(event) => setBookType(event.target.value)}
            >
              <option>Wybierz...</option>
              <option>Kryminał</option>
              <option>Literatura Piękna</option>
              <option>Biografia</option>
              <option>Horror</option>
              <option>Fantasy</option>
              <option>Sci-Fi</option>
              <option>Romans</option>
              <option>Historyczna</option>
            </select>
          </Form.Group>
          <Form.Group id="description">
            <Form.Label>Opis</Form.Label>
            <textarea
              className="form-control"
              type="textArea"
              rows="6"
              ref={descriptionRef}
              required
            />
          </Form.Group>
          <Form.Group id="image">
            <Form.Label>Okładka</Form.Label>
            <Form.Control
              type="file"
              ref={imageRef}
              onChange={(event) => {
                setFile(event.target.files[0]);
              }}
            />
          </Form.Group>
          <Button className="mt-2" type="submit">
            Zatwierdź
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddBook;
