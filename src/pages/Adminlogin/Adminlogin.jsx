import styles from "./Adminlogin.module.css";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext";

function Adminlogin() {
  const {loginAdmin, error, setError, setLoading} = useContext(AuthContext);
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
      setLoading(true);
      await loginAdmin(email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Link to="/homepage">
          <h1 className={styles.title}>Admin Login</h1>
        </Link>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={styles.input}
          autoComplete="off"
          value={email}
          onChange={handleEmailChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className={styles.input}
          value={password}
          onChange={handlePasswordChange}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}
export default Adminlogin;
