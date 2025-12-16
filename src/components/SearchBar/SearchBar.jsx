import styles from "./Searchbar.module.css";

import { Field, Form, Formik } from "formik";

export default function Searchbar({ handleSearch }) {
	const onSubmit = (value, actions) => {
		if (!value.searchValue) return;
		handleSearch(value.searchValue);
		actions.resetForm();
	};
	return (
		<Formik initialValues={{ searchValue: "" }} onSubmit={onSubmit}>
			<Form className={styles.SearchForm}>
				<Field
					type="text"
					name="searchValue"
					className={styles.SearchForm__input}
					autoComplete="off"
					autoFocus
				/>
				<button type="submit" className={styles.SearchForm__button}>
					Search
				</button>
			</Form>
		</Formik>
	);
}
