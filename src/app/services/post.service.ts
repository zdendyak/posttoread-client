import { Injectable } from '@angular/core';

// import { PostGraphQLService } from './post-graphql.service';
import { PostRestService } from './post-rest.service';
import { SwitchRestGqlService } from './switch-rest-gql.service';

import { Observable, Subject } from 'rxjs';

import { Post } from '../post';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  service: any;
  constructor(
    private switchService: SwitchRestGqlService,
    private restService: PostRestService, 
    // private graphqlService: PostGraphQLService
  ) { 
      
      switchService.useRest$.subscribe(useRest => {
        if (useRest) this.service = restService
        // else this.service = graphqlService;
      });
  }

  getService() {
    return this.service;
  }

  getAllPosts(): Observable<Post[]> {
    return this.service.getAllPosts();
  }

  getPostById(id: string): Observable<Post> {
    return this.service.getPostById(id);
  }

  createPost(post) : Subject<Post> {
    return this.service.createPost(post);
  }

  updatePost(post) : Subject<any> {
    return this.service.updatePost(post);
  }

  removePost(id) : Subject<any> {
    return this.service.removePost(id);
  }

  completePost(id, val): Subject<any> {
    return this.service.completePost(id, val);
  }

}
