import AddBook from "./components/actions-for-users/AddBook";
import Navbar from "./components/navigation/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./components/main/StartPage";
import BookDetails from "./components/main/BookDetails";
import Login from "./components/users/Login";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoutes } from "./components/users/ProtectedRoutes";
import React, { useState, useEffect } from "react";
import { ALL_BOOKS } from "./globals";

function App() {
  const [filterByType, setFilterByType] = useState(ALL_BOOKS);
  const [booksList, setBooksList] = useState(undefined);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [modal]);

  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar
            setFilterByType={setFilterByType}
            setModal={setModal}
            booksList={booksList}
          />
          <Routes>
            <Route
              path="/"
              element={
                <StartPage
                  filterByType={filterByType}
                  booksList={booksList}
                  setBooksList={setBooksList}
                />
              }
            />
            <Route
              path="/add-book"
              element={
                <ProtectedRoutes>
                  <AddBook />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/book/:book_id"
              element={<BookDetails setModal={setModal} />}
            />
            {/* <Route path="/login" element={<Login />} /> */}
          </Routes>
        </Router>
        {modal && <Login setModal={setModal} />}
      </AuthProvider>
    </>
  );
}

export default App;
