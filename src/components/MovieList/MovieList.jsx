import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import styles from "./MovieList.module.css";

export default function MovieList({ movies }) {
	const location = useLocation();

	return (
		<ul className={styles.list}>
			{movies.map((movie) => (
				<li key={movie.id}>
					<Link to={`/movies/${movie.id}`} state={location}>
						{movie.title}
					</Link>
				</li>
			))}
		</ul>
	);
}
