import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useContext, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
	Button,
	Card,
	Grid,
	Image,
	Icon,
	Label,
	Form,
} from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import MyPopup from "../utils/myPopup";

function SinglePost() {
	const history = useHistory();
	const { postId } = useParams();
	const { user: contextUser } = useContext(AuthContext);
	const commentInputRef = useRef(null);
	const [comment, setComment] = useState("");
	const { loading, data, error } = useQuery(FETCH_POST_QUERY, {
		variables: { postId },
	});

	const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
		update: () => {
			setComment("");
			commentInputRef.current.blur();
		},
		variables: {
			postId,
			body: comment,
		},
	});

	const deletePostCallback = () => {
		history.push("/");
	};

	if (loading) return <p>Loading Post...</p>;
	if (error) return <p>{`Error! ${error}`}</p>;
	if (data?.getPost) {
		const {
			id,
			body,
			user,
			username,
			createdAt,
			comments,
			likes,
			likesCount,
			commentsCount,
		} = data?.getPost;
		console.log(comments);
		return (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							src="https://react.semantic-ui.com/images/avatar/large/molly.png"
							size="small"
							float="right"
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
								<Card.Description>{body}</Card.Description>
							</Card.Content>
							<hr />
							<Card.Content extra>
								<LikeButton post={{ id, user: contextUser, likes, likesCount }} />
								<MyPopup content="Comment on this post">
									<Button as="div" labelPosition="right">
									<Button basic color="blue">
										<Icon name="comments" />
									</Button>
									<Label basic color="blue" pointing="left">
										{commentsCount}
									</Label>
								</Button>
								</MyPopup>
								{contextUser && contextUser.id === user && (
									<DeleteButton postId={id} callback={deletePostCallback} />
								)}
							</Card.Content>
						</Card>
						{user && (
							<Card fluid>
								<Card.Content>
									<p>Post a comment</p>
									<Form>
										<div className="ui action input fluid">
											<input
												type="text"
												placeholder="Comment . . . "
												name="comment"
												value={comment}
												onChange={(e) => setComment(e.target.value)}
												ref={commentInputRef}
											/>
											<button
												type="submit"
												className="ui button teal"
												disabled={comment.trim() === ""}
												onClick={submitComment}
											>
												Submit
											</button>
										</div>
									</Form>
								</Card.Content>
							</Card>
						)}
						{comments.map((comment) => (
							<Card fluid key={comment.id}>
								<Card.Content>
									{contextUser && contextUser.id === comment.user && (
										<DeleteButton postId={id} commentId={comment.id} />
									)}
									<Card.Header>{comment.username}</Card.Header>
									<Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
									<Card.Description>{comment.body}</Card.Description>
								</Card.Content>
							</Card>
						))}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	} else {
		return <h1>Error</h1>;
	}
}

const SUBMIT_COMMENT_MUTATION = gql`
	mutation createComment($postId: String!, $body: String!) {
		createComment(postId: $postId, body: $body) {
			id
			comments {
				id
				user
				username
				body
				createdAt
			}
			commentsCount
		}
	}
`;

const FETCH_POST_QUERY = gql`
	query($postId: ID!) {
		getPost(postId: $postId) {
			id
			body
			user
			username
			likesCount
			likes {
				id
				user
				username
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

export default SinglePost;
