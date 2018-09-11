import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { map } from  'rxjs/operators';

import { Post, PostResponse } from '../post';

@Injectable({
  providedIn: 'root'
})
export class PostRestService {

  private url: string = 'http://localhost:4000/api/posts/';
  private initialState: Array<Post> = []; 
  private posts$ = new BehaviorSubject(this.initialState);

  constructor(private http: HttpClient) { 
    this.getAllPosts().subscribe((posts: Post[]) => {
      this.posts$.next(posts);
    });
  }

  get posts() {
    return this.posts$.asObservable();
  }


  getAllPosts(): Observable<Post[]> {
    return this.http.get(this.url)
              .pipe(map((result: PostResponse) => result.posts));
  }

  getPostById(id: string): Observable<Post> {
    const postSubject = new Subject<Post>();
    this.http.get(this.url + id)
      .subscribe((result: PostResponse) => postSubject.next(result.post));

    return postSubject;
  }

  createPost(post) : Subject<PostResponse> {
    const postSubject = new Subject<PostResponse>();
    this.http.post(this.url, post)
      .subscribe((result: PostResponse) => {
        if (result.ok) {
          const posts = this.posts$.getValue();
          posts.push(result.post);
          this.posts$.next(posts);
        };
        postSubject.next(result)
      });
    return postSubject;
  }

  updatePost(post) : Subject<PostResponse> {
    const postSubject = new Subject<PostResponse>();
    const id = post._id || post.id;
    this.http.put(this.url + id, post)
      .subscribe((result: any) => {
        if (result.ok) {
          const posts = this.posts$.getValue();
          let updatedIndex = posts.findIndex(p => p.id == id || p._id == id);
          if (updatedIndex > -1) posts[updatedIndex] = post;
          this.posts$.next(posts);
        };
        postSubject.next(result);
      });
    return postSubject;
  }

  removePost(id) : Subject<any> {
    const postSubject = new Subject<any>();
    this.http.delete(this.url + id)
      .subscribe((result: any) => {
        if (result.ok) {
          const posts = this.posts$.getValue();
          const removedIndex = posts.findIndex(post => post.id == id || post._id == id);
          if (removedIndex > -1) {
            posts.splice(removedIndex, 1);
            this.posts$.next(posts);
          } 
        }
        postSubject.next(result);
      });
    return postSubject;
  }

  completePost(id, val): Subject<any> {
    const postSubject = new Subject<Post>();
    this.http.put(this.url + id, { completed: val })
      .subscribe((result: any) => {
        if (result.ok) {
          const posts = this.posts$.getValue();
          const updatedPost = posts.find(post => post.id == id || post._id == id);
          if (updatedPost) updatedPost.completed = val;
          this.posts$.next(posts);
        }
        postSubject.next(result);
      });
    return postSubject;
  }
}
