import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { FETCH_POST_QUERY } from "../utils/graphql";
import MyPopup from "../utils/myPopup";
function DeleteButton({ postId, commentId, callback }) {
	const [confirmOpen, setConfirmOpen] = useState(false);
	const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
	const popupContent = commentId ? "Delete this comment" : "Delete this post";
	const [deletePostOrMutation] = useMutation(mutation, {
		update: (proxy) => {
			setConfirmOpen(false);
			if (!commentId) {
				const data = proxy.readQuery({
					query: FETCH_POST_QUERY,
				});
				proxy.writeQuery({
					query: FETCH_POST_QUERY,
					data: {
						getPosts: [...data.getPosts.filter((p) => p.id !== postId)],
					},
				});
			}
			if (callback) callback();
		},
		variables: {
			postId,
			commentId,
		},
	});
	return (
		<>
			<MyPopup content={popupContent}>
				<Button
					as="div"
					color="red"
					onClick={() => setConfirmOpen(true)}
					floated="right"
				>
					<Icon name="trash" style={{ margin: 0 }} />
				</Button>
			</MyPopup>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={deletePostOrMutation}
			/>
		</>
	);
}

const DELETE_POST_MUTATION = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;

const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment($postId: ID!, $commentId: ID!) {
		deleteComment(postId: $postId, commentId: $commentId) {
			id
			comments {
				id
				user
				username
				createdAt
				body
			}
			commentsCount
		}
	}
`;

export default DeleteButton;
