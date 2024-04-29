import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import styles from "./Signin.module.css";
import {AuthContext} from "../../context/authContext";

const Signup = () => {
  const {login, error, setError, user} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user && user.email === email) {
        setError(`${user.name} is already logged in.`);
        return;
      }

      await login({email, password});
      setError(null);
      window.location.href = "/homepage";
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };
  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_header}>
        <Link to="/homepage">
          <h1>Trailer Flix</h1>
        </Link>
      </div>
      <form className={styles.signup_form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="on"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <Link to="/signup">
          <p>Don't have an account? Sign Up.</p>
        </Link>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Signup;
