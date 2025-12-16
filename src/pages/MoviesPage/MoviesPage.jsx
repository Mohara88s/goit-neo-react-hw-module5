import { useState, useEffect } from "react";
import { fetchMoviesByQuery } from "../../services/themoviedb-api";
import { useLocation, useSearchParams } from "react-router-dom";
import Searchbar from "../../components/Searchbar/Searchbar";
import { ClipLoader } from "react-spinners";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!searchParams.get("query")) return;

		const handleFetch = async () => {
			try {
				setMovies([]);
				setIsLoading(true);
				setError("");
				const data = await fetchMoviesByQuery(searchParams.get("query"));
				setMovies(data.results);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		handleFetch();
	}, [searchParams]);

	const handleSearch = (query) => {
		const params = new URLSearchParams();
		params.set("query", query);
		setSearchParams(params);
	};

	return (
		<>
			<Searchbar handleSearch={handleSearch} />

			{movies.length > 0 && <MovieList movies={movies} state={location} />}

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
