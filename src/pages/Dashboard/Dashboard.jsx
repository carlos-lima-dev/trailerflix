import React, {useContext, useEffect} from "react";
import styles from "./Dashboard.module.css";
import Useradmin from "./Usersadmin/Usersadmin";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import Moviesadmin from "./Moviesadmin/MoviesAdmin";

function Dashboard() {
  const {fetchUsers, user, logoutAdmin, userAuthorization} =
    useContext(AuthContext);
  const isAdmin = user && user.role === "ADMIN" && userAuthorization;
  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className={styles.notautorized}>
        <p className={styles.msg}>
          You do not have permission to access this page
        </p>
        <Link to="/homepage" className={styles.link}>
          Go to Home Page
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.dashboard_container}>
      <Link to="/homepage">
        <h1>Trailer Flix</h1>
      </Link>
      <div>
        <div className={styles.welcome_logoutbtn}>
          <h2 className={styles.dashboard_header}>
            Welcome to the ADMIN Dashboard
          </h2>
          <button
            onClick={() => logoutAdmin()}
            className={styles.logout_button}>
            Logout
          </button>
        </div>
      </div>
      <Useradmin />
      <Moviesadmin />
    </div>
  );
}

export default Dashboard;
