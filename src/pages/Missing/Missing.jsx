import React from "react";
import {Link} from "react-router-dom";
import styles from "./Missing.module.css";

const Missing = () => {
  return (
    <div className={styles.missing_container}>
      <div className={styles.missing_content}>
        <h1 className={styles.missing_title}>Oops! Page Not Found</h1>
        <p className={styles.missing_text}>
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <span className={styles.return_to_home}>
          <Link to="/homepage">
            <p>Return to Home</p>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Missing;
