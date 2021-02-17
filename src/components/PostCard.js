import React, { useContext } from "react";

import { Card, Image, Icon, Label, Button, Popup } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import MyPopup from "../utils/myPopup";
function PostCard(props) {
	const context = useContext(AuthContext);
	const {
		body,
		createdAt,
		id,
		user: userId,
		username,
		likesCount,
		commentsCount,
		likes,
		comments,
	} = props.post;

	const likePost = () => {};
	const commentOnPost = () => {};
	return (
		<Card fluid>
			<Card.Content as={Link} to={`/posts/${id}`}>
				<Image
					floated="right"
					size="mini"
					src="https://react.semantic-ui.com/images/avatar/large/molly.png"
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<LikeButton post={{ id, user: context.user, likes, likesCount }} />
				<MyPopup content="Comment on this post">
					<Button labelPosition="right" as={Link} to={`/post/${id}`}>
						<Button color="blue">
							<Icon name="comments" />
						</Button>
						<Label as="label" basic color="blue" pointing="left">
							{commentsCount}
						</Label>
					</Button>
				</MyPopup>
				{context?.user && context.user.id === userId && (
					<DeleteButton postId={id} />
				)}
			</Card.Content>
		</Card>
	);
}

export default PostCard;
