import React, {useState, useContext, useEffect} from "react";
import {Link} from "react-router-dom";
import styles from "./Signup.module.css";
import {AuthContext} from "../../context/authContext";

const Signup = () => {
  const {signup, error, setError, loading} = useContext(AuthContext);
  const [role] = useState("USER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetForm, setResetForm] = useState(false);

  useEffect(() => {
    if (resetForm) {
      setName("");
      setEmail("");
      setPassword("");
      setResetForm(false);
    }
  }, [resetForm]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{5,10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must have between 5 and 15 characters, contain at least one number, and one uppercase letter."
      );
      return;
    }
    try {
      await signup({name, email, password, role});
      setError(null);
    } catch (error) {
      {
        setError("Email already exists. Please use a different email.");
        setResetForm(true);
      }
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
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            autoComplete="on"
            value={name}
            onChange={handleNameChange}
          />
        </div>
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
        <Link to="/">
          <p>Have an account already? Sign In.</p>
        </Link>
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
