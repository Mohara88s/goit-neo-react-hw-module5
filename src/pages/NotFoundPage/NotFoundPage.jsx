import { Link } from "react-router-dom";

import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
	return (
		<div className={styles.NotFoundPage}>
			<h2 className={styles.warning}>404 Page not found!</h2>
			<Link to={`/`} className={styles.link}>
				Link to Home Page
			</Link>
		</div>
	);
}
