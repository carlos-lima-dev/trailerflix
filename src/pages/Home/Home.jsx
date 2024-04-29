import React, {useContext, useState, useEffect} from "react";
import styles from "./Home.module.css";
import Card from "../../components/Card/Card";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import {MoviesContext} from "../../context/moviesContext";

const Home = () => {
  const {movies, setMovies} = useContext(MoviesContext);
  const {user, logout} = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("desc");
  const moviesPerPage = 12;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("Please sign in to access this page");
    }
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const filteredMovies = movies.filter((movie) => {
    const titleMatch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const yearMatch =
      !isNaN(searchQuery) && movie.year === parseInt(searchQuery);
    const genreMatch = movie.genre
      .toLowerCase()
      .trim()
      .includes(searchQuery.toLowerCase());

    return titleMatch || yearMatch || genreMatch;
  });
  const sortedMovies =
    sortBy === "desc"
      ? [...filteredMovies].sort((a, b) => b.year - a.year)
      : [...filteredMovies].sort((a, b) => a.year - b.year);
  const currentMovies = sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const toggleSortOrder = () => {
    setSortBy(sortBy === "desc" ? "asc" : "desc");
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLogo}>
            <Link to="/homepage" onClick={() => window.location.reload()}>
              <h1>Trailer Flix</h1>
            </Link>
          </div>

          <div className={styles.headerUser}>
            {user && (
              <div className={styles.user_logout}>
                <span>Welcome, {user.name}!</span>
                <Link to="/">
                  <svg
                    onClick={() => logout()}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="24"
                    height="24">
                    <path d="M9 14H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4m8 12l5-5m0 0l-5-5m5 5H11" />
                  </svg>
                </Link>
                <Link to="/admin">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="24"
                    height="24">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 2c-4.42 0-8 3.58-8 8 0 2.65 1.3 5 3.3 6.47A10.01 10.01 0 0 0 2 22h20a10 10 0 0 0-5.3-7.53C18.7 15 20 12.65 20 10c0-4.42-3.58-8-8-8zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6-7h-4V4h4v5z" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className={styles.main}>
        {error && (
          <div className={styles.errorMessage}>
            <Link to="/">
              <p>Welcome To Trailer Flix!</p>
              <p>{error}.</p>
            </Link>
          </div>
        )}
        {!error && (
          <>
            <div className={styles.headerSort}>
              <button onClick={toggleSortOrder}>Sort By: Release Date</button>
              <input
                id="search"
                type="text"
                className={styles.input_search}
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {currentMovies.length === 0 ? (
              <div className={styles.noResults}>
                <p>No results found.</p>
              </div>
            ) : (
              <div className={styles.grid}>
                {currentMovies.map((movie) => (
                  <Card key={movie._id} movie={movie} />
                ))}
              </div>
            )}
            {currentMovies.length >= moviesPerPage && (
              <div className={styles.pagination}>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}>
                  &#9664; {/* Unicode for left arrow */}
                </button>
                {Array.from(
                  {length: Math.ceil(movies.length / moviesPerPage)},
                  (_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={currentPage === i + 1 ? styles.active : ""}>
                      {i + 1}
                    </button>
                  )
                )}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage === Math.ceil(movies.length / moviesPerPage)
                  }>
                  &#9654; {/* Unicode for right arrow */}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>Carlos Lima</p>
        <p>© All Rights Reserved</p>
        <p>{new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Home;
