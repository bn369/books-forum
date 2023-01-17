import AddBook from "./components/AddBook";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import BookDetails from "./components/BookDetails";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { useState } from "react";

function App() {
  const [filterByType, setFilterByType] = useState("wszystkie");
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar
            setFilterByType={setFilterByType}
            filterByType={filterByType}
          />
          <Routes>
            <Route
              path="/"
              element={<StartPage filterByType={filterByType} />}
            />
            <Route
              path="/add-book"
              element={
                <ProtectedRoutes>
                  <AddBook />
                </ProtectedRoutes>
              }
            />
            <Route path="/book/:book_id" element={<BookDetails />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
