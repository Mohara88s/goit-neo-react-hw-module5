import { useState, useEffect, useRef } from "react";
import { fetchMovieById, IMAGE_URL } from "../../services/themoviedb-api";
import { Link, useParams, useLocation, Outlet } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

import styles from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
	const location = useLocation();
	const backLinkRef = useRef(location.state ?? "/movies");
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
				setError(error.message);
				toast.error(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		getMovie();
	}, [movieId]);

	return (
		<div className={styles.MovieDetailsPage}>
			{isLoading && (
				<ClipLoader
					color="#1976d2"
					size={50}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			)}
			{movie && (
				<>
					<Link to={backLinkRef.current} className={styles.button}>
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
							<Link to="cast" state={location.state}>
								Cast
							</Link>
						</li>
						<li>
							<Link to="reviews" state={location.state}>
								Reviews
							</Link>
						</li>
					</ul>

					<hr />

					<Outlet />
				</>
			)}
		</div>
	);
}
