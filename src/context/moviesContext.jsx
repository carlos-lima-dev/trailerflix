import React, {createContext, useState, useEffect} from "react";
import {BLOG_API_FETCH_MOVIES} from "../constants/constants";

export const MoviesContext = createContext();

export const MoviesProvider = ({children}) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [newMovieDataCreate, setNewMovieDataCreate] = useState({
    title: "",
    description: "",
    genre: "",
    year: "",
    trailer: "",
    image: null,
  });
  const [newMovieDataUpdate, setNewMovieDataUpdate] = useState({
    title: "",
    description: "",
    genre: "",
    year: "",
    trailer: "",
    image: null,
  });

  // PRODUCTS LOGIC
  async function fetchMovies() {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("No access token found user must sign in!");
        return;
      }
      const response = await fetch(BLOG_API_FETCH_MOVIES, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const moviesData = await response.json();
      setMovies(moviesData);
      console.log(moviesData);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }
  const deleteMovie = async (movieId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${BLOG_API_FETCH_MOVIES}/${movieId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }
      setMovies(movies.filter((movie) => movie._id !== movieId));

      if (selectedMovie && selectedMovie._id === movieId) {
        setSelectedMovie(null);
        setNewMovieDataUpdate({
          title: "",
          description: "",
          genre: "",
          year: "",
          trailer: "",
          image: null,
        });
      }

      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };
  const registerNewMovie = async (event) => {
    event.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("title", newMovieDataCreate.title);
      formData.append("description", newMovieDataCreate.description);
      formData.append("genre", newMovieDataCreate.genre);
      formData.append("year", newMovieDataCreate.year);
      formData.append("trailer", newMovieDataCreate.trailer);
      formData.append("image", newMovieDataCreate.image);

      const response = await fetch(BLOG_API_FETCH_MOVIES, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to register movie");
      }

      setNewMovieDataCreate({
        title: "",
        description: "",
        genre: "",
        year: "",
        trailer: "",
        image: null,
      });
      fetchMovies();
    } catch (error) {
      console.error("Error registering new movie:", error);
    }
  };
  const updateMovie = async (event) => {
    event.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("title", newMovieDataUpdate.title);
      formData.append("description", newMovieDataUpdate.description);
      formData.append("genre", newMovieDataUpdate.genre);
      formData.append("year", newMovieDataUpdate.year);
      formData.append("trailer", newMovieDataUpdate.trailer);
      formData.append("image", newMovieDataUpdate.image);

      const response = await fetch(
        `${BLOG_API_FETCH_MOVIES}/${selectedMovie._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update movie");
      }

      setSelectedMovie(null);
      setNewMovieDataUpdate({
        title: "",
        description: "",
        genre: "",
        year: "",
        trailer: "",
        image: null,
      });
      fetchMovies();
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        fetchMovies,
        movies,
        setMovies,
        selectedMovie,
        setSelectedMovie,
        newMovieDataCreate,
        setNewMovieDataCreate,
        newMovieDataUpdate,
        setNewMovieDataUpdate,
        deleteMovie,
        registerNewMovie,
        updateMovie,
      }}>
      {children}
    </MoviesContext.Provider>
  );
};
