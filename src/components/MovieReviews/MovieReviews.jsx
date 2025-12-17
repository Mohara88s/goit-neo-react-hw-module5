import { useState, useEffect } from "react";
import { fetchMovieReviewsById } from "../../services/themoviedb-api";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

import styles from "./MovieReviews.module.css";

export default function MovieReviews() {
	const { movieId } = useParams();
	const [reviews, setReviews] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getMovieReviews = async () => {
			try {
				const data = await fetchMovieReviewsById(movieId);
				setReviews(data.results);
			} catch (error) {
				setError(error.message);
				toast.error(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		getMovieReviews();
	}, [movieId]);
	return (
		<div className={styles.MovieReviews}>
			{reviews.length > 0 && (
				<ul className={styles.MovieReviews__list}>
					{reviews.map((el) => (
						<li key={el.id} className={styles.MovieReviews__list__item}>
							<p className={styles.MovieReviews__author}>
								<span>Author: </span>
								{el.author}
							</p>
							<p>{el.content}</p>
						</li>
					))}
				</ul>
			)}
			{!isLoading && reviews.length === 0 && (
				<p>We don't have any reviews for this movie</p>
			)}
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
