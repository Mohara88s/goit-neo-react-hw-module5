import { useState, useEffect } from "react";
import { fetchMoviesByQuery } from "../../services/themoviedb-api";
import { useSearchParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import { ClipLoader } from "react-spinners";
import MovieList from "../../components/MovieList/MovieList";
import toast from "react-hot-toast";

export default function MoviesPage() {
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
				setError(error.message);
				toast.error(error.message);
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
			<Search handleSearch={handleSearch} />

			{movies.length > 0 && <MovieList movies={movies} />}

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
