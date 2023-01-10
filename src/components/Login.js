import React, { useState } from "react";
import { AuthProvider } from "../context/AuthContext";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { signInWithGoogle } = UserAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
    if (error) {
      alert(error);
    }
  };

  return (
    <AuthProvider>
      <div>Sign in with Google</div>
      <button onClick={handleSignup}>Sign In</button>
    </AuthProvider>
  );
};

export default Login;
