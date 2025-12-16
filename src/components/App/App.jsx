import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ClipLoader } from "react-spinners";
import AppBar from "../AppBar/AppBar";
import NotFoundView from "../../pages/NotFoundPage/NotFoundPage";

const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
	import("../../pages/MovieDetailsPage/MovieDetailsPage")
);

export default function App() {
	return (
		<>
			<AppBar />

			<Suspense
				fallback={
					<ClipLoader
						color="#1976d2"
						size={50}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				}
			>
				<Routes>
					<Route path="/" element={<HomePage />}></Route>

					<Route path="/movies" element={<MoviesPage />}></Route>
					<Route path="/movies/:movieId" element={<MovieDetailsPage />}>
						<Route path="cast" element={<MovieCast />} />
						<Route path="reviews" element={<MovieReviews />} />
					</Route>

					<Route path="*" element={<NotFoundView />}></Route>
				</Routes>
			</Suspense>
		</>
	);
}
