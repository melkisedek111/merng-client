import { useState } from "react";
export const useForm = (callback, initialState = {}) => {
	const [values, setValues] = useState(initialState);
	const handleChange = (e) => {
		const { value, name } = e.target;
		setValues({ ...values, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		callback();
	};
	return {
		handleChange,
		handleSubmit,
		values,
	};
};
