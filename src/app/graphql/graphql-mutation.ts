import gql from 'graphql-tag'; 

export const CreatePost = gql`
    mutation createPost($title: String!, $link: String!, $note: String, $category: String) {
        createPost(title: $title, link: $link, note: $note, category: $category) {
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

export const UpdatePost = gql`
    mutation updateUser($id: String!, $title: String, $link: String, $note: String, $category: String, $completed: Boolean) {
        updatePost(id: $id, title: $title, link: $link, note: $note, category: $category, completed: $completed) {
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

export const RemovePost = gql`
    mutation removePost($id: String!) {
        removePost(id: $id) {
            id
        }
    }
`;

export default {
    CreatePost,
    UpdatePost,
    RemovePost
}