import styles from "./Card.module.css";
import {Link} from "react-router-dom";
const Card = ({movie}) => {
  return (
    <>
      <Link to={`/movie/${movie._id}`}>
        <div className={styles.card}>
          <img
            src={`https://backend-build-api-11.onrender.com/${movie.image}`}
            alt={movie.title}
            className={styles.poster}
          />
          <div className={styles.cardContent}>
            <p>Watch Trailer</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
