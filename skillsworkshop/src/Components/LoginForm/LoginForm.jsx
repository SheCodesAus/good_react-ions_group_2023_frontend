import React, { useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";

function LoginForm() {
  const [, setLoggedIn] = useOutletContext();

  // State
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Hooks
  const navigate = useNavigate();

  // Actions
  const handleChange = (event) => {
    // plugging to the input - event is passed into it
    const { id, value } = event.target; // get target of event which is the input

    setCredentials((prevCredentials) => ({ ...prevCredentials, [id]: value }));
  }; // this is an explicit return.

  const postData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api-token-auth/`,
      // `${import.meta.env.VITE_API_URL}users/<int:pk>/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
    return response.json();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (credentials.username && credentials.password) {
      const { token } = await postData();
      if (token !== undefined) {
        window.localStorage.setItem("token", token);
        setLoggedIn(true);
        navigate("/");
      } else {
        setLoggedIn(false);
      }
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Log In:</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <div>
        <button className="project-button" type="submit">
          LOGIN
        </button>
      </div>
      <p>
        Not a user? Sign up <Link to="/sign-up">here</Link>
      </p>
    </form>
  );
}

export default LoginForm;
