import React, {useContext} from "react";
import styles from "./MoviesAdmin.module.css";
import {MoviesContext} from "../../../context/moviesContext";

function MoviesAdmin() {
  const {
    fetchMovies,
    movies,
    selectedMovie,
    setSelectedMovie,
    newMovieDataCreate,
    setNewMovieDataCreate,
    newMovieDataUpdate,
    setNewMovieDataUpdate,
    deleteMovie,
    registerNewMovie,
    updateMovie,
  } = useContext(MoviesContext);

  const handleInputChangeMovies = (event, formType) => {
    const {name, value, files} = event.target;
    if (formType === "create") {
      setNewMovieDataCreate({
        ...newMovieDataCreate,
        [name]: files ? files[0] : value,
      });
    } else if (formType === "update") {
      setNewMovieDataUpdate({
        ...newMovieDataUpdate,
        [name]: files ? files[0] : value,
      });
    }
  };

  const handleMovieSelectChange = (event) => {
    const movieId = event.target.value;
    const selected = movies.find((movie) => movie._id === movieId);
    setSelectedMovie(selected);
    if (selected) {
      setNewMovieDataUpdate({
        title: selected.title,
        description: selected.description,
        genre: selected.genre,
        year: selected.year,
        trailer: selected.trailer,
        image: null,
      });
    } else {
      setNewMovieDataUpdate({
        title: "",
        description: "",
        genre: "",
        year: "",
        trailer: "",
        image: null,
      });
    }
  };

  return (
    <>
      <div className={styles.product_list_container}>
        <h2>Movies List</h2>

        <div className={styles.product_cards_container}>
          {movies.map((movie) => (
            <div key={movie._id} className={styles.product_card}>
              <img
                src={`https://backend-build-api-11.onrender.com/${movie.image}`}
                alt="movie image"
              />
              <div className={styles.product_details}>
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <p>Genre: {movie.genre}</p>
                <p>Year: {movie.year}</p>
                <button
                  className={styles.delete_button}
                  onClick={() => deleteMovie(movie._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className={styles.h2_font}>Add New Movie</h2>
        <form
          className={styles.register_form}
          id="productForm"
          onSubmit={registerNewMovie}
          encType="multipart/form-data">
          <div className={styles.form_group}>
            <label htmlFor="productName">Name</label>
            <input
              type="text"
              id="productName"
              name="title"
              autoComplete="on"
              value={newMovieDataCreate.title}
              onChange={(event) => handleInputChangeMovies(event, "create")}
              required
            />
            <div id="productNameError" className={styles.error_message}></div>
          </div>
          <div className={styles.form_group}>
            <label htmlFor="productDescription">Description</label>
            <input
              type="text"
              id="productDescription"
              name="description"
              autoComplete="on"
              value={newMovieDataCreate.description}
              onChange={(event) => handleInputChangeMovies(event, "create")}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="productGenre">Genre</label>
            <input
              type="text"
              id="productGenre"
              name="genre"
              autoComplete="on"
              value={newMovieDataCreate.genre}
              onChange={(event) => handleInputChangeMovies(event, "create")}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="productYear">Year</label>
            <input
              type="number"
              id="productYear"
              name="year"
              value={newMovieDataCreate.year}
              onChange={(event) => handleInputChangeMovies(event, "create")}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="productTrailer">Trailer</label>
            <input
              type="text"
              id="productTrailer"
              name="trailer"
              autoComplete="on"
              value={newMovieDataCreate.trailer}
              onChange={(event) => handleInputChangeMovies(event, "create")}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="productImage">Image</label>
            <input
              type="file"
              id="productImage"
              name="image"
              accept="image/*"
              onChange={(event) => handleInputChangeMovies(event, "create")}
              required
            />
          </div>
          <button className={styles.register_button} type="submit">
            Add Movie
          </button>
        </form>
      </div>
      <div className={styles.update_product_container}>
        <h2 className={styles.h2_font}>Update Movie</h2>
        <form
          className={styles.update_form}
          onSubmit={updateMovie}
          encType="multipart/form-data">
          <div className={styles.form_group}>
            <label htmlFor="productSelect">Select Movie</label>
            <select
              id="productSelect"
              onChange={handleMovieSelectChange}
              value={selectedMovie ? selectedMovie._id : ""}>
              <option value="">Select a Movie</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.form_group}>
            <label htmlFor="updateProductName">Name</label>
            <input
              type="text"
              id="updateProductName"
              autoComplete="on"
              name="title"
              value={newMovieDataUpdate.title}
              onChange={(event) => handleInputChangeMovies(event, "update")}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="updateProductDescription">Description</label>
            <input
              type="text"
              id="updateProductDescription"
              autoComplete="on"
              name="description"
              value={newMovieDataUpdate.description}
              onChange={(event) => handleInputChangeMovies(event, "update")}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="updateProductGenre">Genre</label>
            <input
              type="text"
              id="updateProductGenre"
              autoComplete="on"
              name="genre"
              value={newMovieDataUpdate.genre}
              onChange={(event) => handleInputChangeMovies(event, "update")}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="updateProductYear">Year</label>
            <input
              type="number"
              id="updateProductYear"
              name="year"
              value={newMovieDataUpdate.year}
              onChange={(event) => handleInputChangeMovies(event, "update")}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="updateProductTrailer">Trailer</label>
            <input
              type="text"
              id="updateProductTrailer"
              autoComplete="on"
              name="trailer"
              value={newMovieDataUpdate.trailer}
              onChange={(event) => handleInputChangeMovies(event, "update")}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="updateProductImage">Image</label>
            <input
              type="file"
              id="updateProductImage"
              name="image"
              accept="image/*"
              onChange={(event) => handleInputChangeMovies(event, "update")}
            />
          </div>
          <button className={styles.update_button} type="submit">
            Update Movie
          </button>
        </form>
      </div>
    </>
  );
}

export default MoviesAdmin;
