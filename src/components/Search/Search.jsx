import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import styles from "./Search.module.css";

export default function Search({ handleSearch }) {
	const onSubmit = (value, actions) => {
		if (!value.searchValue) return toast.error("Enter search data");
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
