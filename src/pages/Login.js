import { gql, useMutation } from "@apollo/client";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";

import { AuthContext } from "../context/auth";

function Login() {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});
	const history = useHistory();
	const { handleChange, handleSubmit, values } = useForm(loginUserCallback, {
		username: "",
		password: "",
	});
	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }) {
			context.login(userData);
			history.push("/");
		},
		onError: (err) => {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values,
	});
	function loginUserCallback() {
		loginUser();
	}
	return (
		<div className="form-container">
			<Form
				onSubmit={handleSubmit}
				noValidate
				className={loading ? "loading" : ""}
			>
				<h1>Login</h1>
				<Form.Input
					label="Username"
					placeholder="Username . . "
					name="username"
					value={values.username}
					error={errors.username ? true : false}
					onChange={handleChange}
				/>
				<Form.Input
					label="Password"
					placeholder="Password . . "
					name="password"
					value={values.password}
					error={errors.password ? true : false}
					onChange={handleChange}
					type="password"
				/>
				<Button type="submit" primary>
					Login
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Login;
