import { useState, useEffect } from "react";
import { fetchMovieById, IMAGE_URL } from "../../services/themoviedb-api";
import { Link, useParams, useLocation, Outlet } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
	const location = useLocation();
	const backLinkHref = location.state ?? "/movies";
	const { movieId } = useParams();
	const [movie, setMovie] = useState(null);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getMovie = async () => {
			try {
				setIsLoading(true);
				setError("");
				const data = await fetchMovieById(movieId);
				setMovie(data);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		getMovie();
	}, [movieId]);

	return (
		<div className={styles.MovieDetailsPage}>
			<Link to={backLinkHref} className={styles.button}>
				<FaArrowLeft /> Go back
			</Link>
			<div className={styles.card}>
				{movie && (
					<>
						<img
							className={styles.card__pic}
							src={
								movie.poster_path
									? `${IMAGE_URL}${movie.poster_path}`
									: "https://www.meme-arsenal.com/memes/56560310e90c633f9239e83ea1523504.jpg"
							}
							alt={movie.original_title}
						/>
						<ul className={styles.card__info}>
							<li>
								<h2>{movie.original_title}</h2>
							</li>
							<li>
								<p>User score: {Math.round(movie.vote_average * 10)}%</p>
							</li>
							<li>
								<h3>Overview</h3>
							</li>
							<li>
								<p>{movie.overview}</p>
							</li>
							<li>
								<h4>Genres</h4>
							</li>
							<li>
								{movie.genres.length > 0 &&
									movie.genres.map((genre) => (
										<span key={genre.id}>{genre.name} </span>
									))}
							</li>
						</ul>
					</>
				)}
			</div>
			<hr />
			<p>Additional information</p>

			<ul className={styles.list}>
				<li>
					<Link to="cast">Cast</Link>
				</li>
				<li>
					<Link to="reviews">Reviews</Link>
				</li>
			</ul>

			<hr />

			<Outlet />
		</div>
	);
}
