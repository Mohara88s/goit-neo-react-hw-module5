import { useState, useEffect } from "react";
import { fetchTrendingMoviesToday } from "../../services/themoviedb-api";
import { useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import MovieList from "../../components/MovieList/MovieList";

import styles from "./HomePage.module.css";

export default function HomePage() {
	const location = useLocation();
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
				setError(error);
			} finally {
				setIsLoading(false);
			}
		}

		getMovies();
	}, []);

	return (
		<div className={styles.HomePage}>
			<h2>Trending today</h2>
			{movies.length > 0 && <MovieList movies={movies} state={location} />}
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
