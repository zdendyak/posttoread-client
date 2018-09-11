export interface Post {
    id?: string,
    _id?: string,
    title?: string,
    link?: string,
    completed?: boolean,
    created?: string,
    note?: string,
    category?: string
}

export interface PostResponse {
    ok: boolean,
    post?: Post,
    posts?: Array<Post>
}
