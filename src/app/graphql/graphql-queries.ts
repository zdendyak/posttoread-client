import gql from 'graphql-tag'; 

export const Posts = gql`
    query Posts {
        posts {
            id
            title
            link
            completed
            note
            category
            created
        }
    }
`;

export const Post = gql`
    query Post ($id: String!) {
        post (id: $id) {
            id
            title
            link
            completed
            note
            category
            created
        }
    }
`;

export default {
    Posts,
    Post
}