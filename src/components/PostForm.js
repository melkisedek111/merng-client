import React,{useState} from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { FETCH_POST_QUERY } from "../utils/graphql";
function PostForm() {
	const { values, handleChange, handleSubmit } = useForm(craetePostCallback, {
		body: "",
	});

	const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
		variables: values,
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_POST_QUERY,
			});
			proxy.writeQuery({ query: FETCH_POST_QUERY, data: {
				getPosts: [result.data.createPost, ...data.getPosts]
			} });
			values.body = "";
		},
		onError: (err) => {},
	});

	function craetePostCallback() {
		createPost();
	}
	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<h2>Craete a Post:</h2>
				<Form.Field>
					<Form.Input
						placeholder="Hi World"
						name="body"
						onChange={handleChange}
						value={values.body}
						error={error ? true : false}
					/>
					<Button type="submit" color="teal">
						Submit
					</Button>
				</Form.Field>
			</Form>
			{
				error && (
					<div className="ui error message" style={{marginBottom: '20px'}}>
						<ul className="list">
							<li>{error.graphQLErrors[0].message}</li>
						</ul>
					</div>
				)
			}
		</div>
	);
}

const CREATE_POST_MUTATION = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			body
			createdAt
			user
			username
			likesCount
			likes {
				id
				user
				username
				createdAt
			}
			commentsCount
			comments {
				id
				user
				username
				createdAt
				body
			}
		}
	}
`;

export default PostForm;
