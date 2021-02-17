import { gql } from "@apollo/client";

export const FETCH_POST_QUERY = gql`
{
    getPosts {
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