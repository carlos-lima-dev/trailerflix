import React, {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import {MoviesContext} from "../../context/moviesContext";
import {Link} from "react-router-dom";
import styles from "./Movie.module.css";

const Movie = () => {
  const {id} = useParams();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const {movies} = useContext(MoviesContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user.name;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          `https://backend-build-api-11.onrender.com/api/comments?movieId=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setComments(data.filter((comment) => comment.movie_Id === id));
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  const data = {
    movie_Id: id,
    text: comment,
    user: userName,
  };

  const movie = movies.find((movie) => movie._id === id);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setComment("Please enter a comment before sending...");
      return;
    }
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://backend-build-api-11.onrender.com/api/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );
      const newComment = await response.json();
      setComments([...comments, newComment]);
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (!movie) {
    return <p>Filme não encontrado</p>;
  }

  return (
    <div className={styles.container}>
      <Link to="/homepage">
        <h2>Trailer Flix</h2>
      </Link>

      <div className={styles.trailer}>
        <div>
          <iframe
            className="video"
            title="Youtube player"
            sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
            src={`https://youtube.com/embed/${movie.trailer}?autoplay=0`}></iframe>
        </div>
        <div className={styles.text}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <p>Release Date: {movie.year}</p>
          <p>Genres: {movie.genre}</p>
        </div>
      </div>
      <div className={styles.coment_section}>
        <form
          className={styles.coment_section_text}
          onSubmit={handleCommentSubmit}>
          <textarea
            id="comment"
            value={comment}
            onChange={handleCommentChange}
            placeholder={comment ? "" : "Leave your comment..."}></textarea>
          <button type="submit">Enviar</button>
        </form>

        <div className={styles.comments}>
          <h3>Comments:</h3>
          {comments.length === 0 ? (
            <p>No comments. Be the first to comment!</p>
          ) : (
            comments.map((comment, index) => (
              <div className={styles.comments_user} key={index}>
                <span>{comment.user}:</span> <span>{comment.text}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
