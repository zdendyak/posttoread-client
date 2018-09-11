import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import Queries from '../graphql/graphql-queries';
import Mutation from '../graphql/graphql-mutation';

import { Post } from '../post';
import { Observable, Subject } from 'rxjs';

import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostGraphQLService { 
  
  constructor(private apollo: Apollo) { }

  getAllPosts (): Observable<[Post]> {
    return this.apollo.watchQuery({
      query: Queries.Posts
    })
    .valueChanges
    .pipe(map((result: any) => result.data.posts))
  }

  getPostById (id): Subject<Post> {
    const postSubject = new Subject<Post>(); 
    this.apollo.watchQuery({
      query: Queries.Post,
      variables: {
        id,
      },
    })
    .valueChanges
    .subscribe((result: any) => {
      postSubject.next(result.data.post);
    });
    return postSubject;
  }

  createPost(post) {
    return this.apollo.mutate({
      mutation: Mutation.CreatePost,
      variables: post, 
      update: (store, { data: { createPost }}) => {
        // Read the data from our cache for this query
        const data: any = store.readQuery({ query: Queries.Posts });
        // Add our new post from this mutation to the end
        data.posts.push(createPost);
        // Write our data back to the cache
        store.writeQuery({ query: Queries.Posts, data });
      }
    })
  }

  updatePost(post) {
    console.log('update Post with new data', post);
    return this.apollo.mutate({
      mutation: Mutation.UpdatePost,
      variables: post, 
      update: (store, { data: { updatePost }}) => {
        // Read the data from our cache for this query
        const data: any = store.readQuery({ query: Queries.Posts });
        console.log('data from store', data);
        // Find edited post
        const index = data.posts.map(x => x.id).indexOf(post.id);
        data.posts[index] = updatePost;
        // Write our data back to the cache
        store.writeQuery({ query: Queries.Posts, data });
      }
    })
  }

  completePost(id, val) {
    
  }

  removePost(id) {
    this.apollo.mutate({
      mutation: Mutation.RemovePost,
      variables: { id },
      update: (store, { data: { removePost }}) => {
        // Read the data from our cache for this query
        const data: any = store.readQuery({ query: Queries.Posts });
        // Find edited post
        const index = data.posts.find(p => p.id == id);
        data.posts.splice(index, 1);
        // Write our data back to the cache
        store.writeQuery({ query: Queries.Posts, data });
      }
    })
  }
}
