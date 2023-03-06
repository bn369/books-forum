import React, { useState } from "react";
import { AuthProvider } from "../../context/AuthContext";
import { UserAuth } from "../../context/AuthContext";
import { Button, Card } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";

const Login = ({ setModal }) => {
  const [error, setError] = useState();

  const { signInWithGoogle } = UserAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithGoogle();
      setModal(false);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
    if (error) {
      alert(error);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(49, 49, 49, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => setModal(false)}
    >
      <AuthProvider>
        <Card
          style={{
            margin: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px",
            border: "3px solid #0275d8",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <FcGoogle size={120} />
          <Button
            onClick={handleSignup}
            varian="primary"
            style={{
              fontSize: "35px",
              marginLeft: "30px",
              padding: "15px",
            }}
          >
            Sign In With Google
          </Button>
        </Card>
      </AuthProvider>
    </div>
  );
};

export default Login;
