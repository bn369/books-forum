import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ booksList }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState([]);
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  const filterHandler = (e) => {
    const searchBook = e.target.value;
    setInput(e.target.value);
    const chars = searchBook.split("");
    const filteredList = booksList.filter((book) => {
      return chars.every(
        (char) =>
          book.title.toLowerCase().includes(char) ||
          book.author.toLowerCase().includes(char)
      );
    });
    setFilteredData(filteredList);
  };

  const handleMouseEnter = (event, index) => {
    setIsHover((c) => {
      return {
        ...c,
        [index]: true,
      };
    });
  };
  const handleMouseLeave = (event, index) => {
    setIsHover((c) => {
      return {
        ...c,
        [index]: false,
      };
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "25px",
        right: "30px",
        zIndex: "5",
        color: "white",
      }}
    >
      <Form style={{ margin: "auto", width: "300px" }}>
        <Form.Control
          type="search"
          placeholder="Wyszukaj..."
          className="me-2"
          aria-label="Search"
          value={input}
          onChange={filterHandler}
        />
      </Form>
      {input.length > 2 && (
        <div
          style={{
            height: "200px",
            marginTop: "5px",
            overflow: "hidden",
            overflowY: "auto",
            borderBottomRightRadius: "5px",
            borderBottomLeftRadius: "5px",
            cursor: "pointer",
          }}
        >
          {filteredData.map((book, i) => (
            <div
              key={i}
              style={{
                backgroundColor: isHover[i] ? "#455d7a" : "#222831",
                padding: "5px",
                paddingLeft: "15px",
                borderBottom:
                  filteredData.length === i + 1 ? "none" : "1px solid white",
              }}
              onClick={() => {
                navigate(`book/${book.id}`);
                setInput([]);
              }}
              onMouseEnter={(e) => {
                handleMouseEnter(e, i);
              }}
              onMouseLeave={(e) => {
                handleMouseLeave(e, i);
              }}
            >
              <div>{book.title}</div>
              <div>{book.author}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
