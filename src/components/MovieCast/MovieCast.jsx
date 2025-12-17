import { useState, useEffect } from "react";
import { fetchMovieCastById, IMAGE_URL } from "../../services/themoviedb-api";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

import styles from "./MovieCast.module.css";

export default function MovieCast() {
	const { movieId } = useParams();
	const [cast, setCast] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getMovieCast = async () => {
			try {
				const data = await fetchMovieCastById(movieId);
				setCast(data.cast);
			} catch (error) {
				setError(error.message);
				toast.error(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		getMovieCast();
	}, [movieId]);
	return (
		<>
			{cast.length > 0 && (
				<ul className={styles.MovieCast}>
					{cast.map((el) => (
						<li key={el.id} className={styles.MovieCast__item}>
							<img
								src={
									el.profile_path
										? `${IMAGE_URL}${el.profile_path}`
										: "https://www.meme-arsenal.com/memes/56560310e90c633f9239e83ea1523504.jpg"
								}
								alt={el.name}
								className={styles.MovieCast__pic}
							/>
							<p className={styles.MovieCast__name}>{el.name}</p>
							<p className={styles.MovieCast__character}>
								Character:{el.character}
							</p>
						</li>
					))}
				</ul>
			)}
			{!isLoading && cast.length === 0 && (
				<p>We don't have a cast for this movie</p>
			)}
			{isLoading && (
				<ClipLoader
					color="#1976d2"
					size={50}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			)}
		</>
	);
}
