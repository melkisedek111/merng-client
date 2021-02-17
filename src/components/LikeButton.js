import { useMutation, gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label, Popup } from "semantic-ui-react";
import MyPopup from '../utils/myPopup';
function LikeButton({ post: { id, user, likes, likesCount } }) {
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		if (user && likes.find((like) => like.user === user.id)) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [user, likes]);

	const [likePost] = useMutation(LIKE_POST_MUTATION, {
		variables: { postId: id },
		onError: () => {},
	});

	const likeButton = user ? (
		liked ? (
			<Button color="teal">
				<Icon name="heart" />
			</Button>
		) : (
			<Button color="teal" basic>
				<Icon name="heart" />
			</Button>
		)
	) : (
		<Button as={Link} to="/login" color="teal" basic>
			<Icon name="heart" />
		</Button>
	);
	return (
		<MyPopup
			content="Like this post"
		>
            <Button as="div" labelPosition="right" onClick={likePost}>
					{likeButton}
					<Label as="a" basic color="teal" pointing="left">
						{likesCount}
					</Label>
				</Button>
        </MyPopup>
	);
}

const LIKE_POST_MUTATION = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likes {
				id
				user
				username
			}
			likesCount
		}
	}
`;

export default LikeButton;
