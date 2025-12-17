import { useState, useEffect } from "react";
import { fetchTrendingMoviesToday } from "../../services/themoviedb-api";
import { ClipLoader } from "react-spinners";
import MovieList from "../../components/MovieList/MovieList";
import toast from "react-hot-toast";

import styles from "./HomePage.module.css";

export default function HomePage() {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function getMovies() {
			try {
				setIsLoading(true);
				setError("");
				const data = await fetchTrendingMoviesToday();
				setMovies(data.results);
			} catch (error) {
				setError(error.message);
				toast.error(error.message);
			} finally {
				setIsLoading(false);
			}
		}

		getMovies();
	}, []);

	return (
		<div className={styles.HomePage}>
			<h1>Trending today</h1>
			{movies.length > 0 && <MovieList movies={movies} />}
			{isLoading && (
				<ClipLoader
					color="#1976d2"
					size={50}
					aria-label="Loading Spinner"
					data-testid="loader"
				/>
			)}
		</div>
	);
}
