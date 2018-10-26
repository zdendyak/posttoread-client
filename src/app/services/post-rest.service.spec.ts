import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostRestService } from './post-rest.service';
import { of } from 'rxjs';
import { Post } from '../post';

describe('PostRestService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let postService: PostRestService;
  let apiUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [PostRestService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    postService = TestBed.get(PostRestService);
    apiUrl = 'http://localhost:4000/api/posts/';
  });

  afterEach(() => {
    // After each test, assert that there are no more pending request
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(postService).toBeTruthy();

    // PostService should have made one request to GET heroes from expected URL at constructor
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET');

    // respond with the empty array
    req.flush({ posts: [] });
  });

  describe('#getAllPosts', () => {
    let expectedPosts : Post[];
    beforeEach(() => {
      expectedPosts = [
              {
                id: "1",
                title: "title1",
                link: "link1",
                completed: false,
                created: new Date().toDateString()
              },
              {
                id: "2",
                title: "title2",
                link: "link2",
                completed: false,
                created: new Date().toDateString()
              }
            ] as Post[];
    });

    it('should return expected posts (called twice: first in constructor and then our call)', () => {
      postService.getAllPosts().subscribe(
        posts => expect(posts).toEqual(expectedPosts, 'should return expected posts'),
        fail
      );

      // PostService should have made two requests (one in the constructor) to GET heroes from expected URL
      const requests = httpTestingController.match(apiUrl);
      expect(requests.length).toEqual(2, 'calls to getAllPosts()');

      // Respond to each request with mock post results
      requests[0].flush({ posts: expectedPosts });
      requests[1].flush({ posts: expectedPosts });
    });

    it('should be OK returning no heroes', () => {
      postService.getAllPosts().subscribe(
        posts => expect(posts.length).toEqual(0, ' should have empty posts array'),
        fail 
      );

      // PostService should have made two requests (one in the constructor) to GET heroes from expected URL
      const requests = httpTestingController.match(apiUrl);
      expect(requests.length).toEqual(2, 'calls to getAllPosts()');

      // Respond to each request with mock post results
      requests[0].flush({posts: []});
      requests[1].flush({posts: []});
    });

    it ('should turn 404 into an empty posts result', () => {
      postService.getAllPosts().subscribe(
        posts => expect(posts.length).toEqual(0, 'should return empty posts array'),
        fail
      );

      // respond with a 404 and the error message
      const msg = 'deliberate 404 error';
      // PostService should have made two requests (one in the constructor) to GET heroes from expected URL
      const requests = httpTestingController.match(apiUrl);
      expect(requests.length).toEqual(2, 'calls to getAllPosts()');

      // Respond to each request with mock post results
      requests[0].flush(msg, { status: 404, statusText: 'Not Found'});
      requests[1].flush(msg, { status: 404, statusText: 'Not Found'});
    });

    it('should return expected posts (called multiple times)', () => {

      postService.getAllPosts().subscribe(
        posts => expect(posts.length).toEqual(0, 'should return empty array'),
        fail
      );
      postService.getAllPosts().subscribe();
      postService.getAllPosts().subscribe(
        posts => expect(posts).toEqual(expectedPosts , 'should return expected posts'),
        fail
      );

      const requests = httpTestingController.match(apiUrl);
      expect(requests.length).toEqual(4, 'calls to getAllPosts()');

      // Respond to each request with different mock hero results
      requests[0].flush({ posts: expectedPosts });
      requests[1].flush({ posts: [] });
      requests[2].flush({ posts: [{ id: "1", "title": 'title', "link": "link" }] });
      requests[3].flush({ posts: expectedPosts });
    });

  });

  describe('#posts getter', () => {
    let expectedPosts : Post[];
    beforeEach(() => {
      expectedPosts = [
              {
                id: "1",
                title: "title1",
                link: "link1",
                completed: false,
                created: new Date().toDateString()
              }
            ] as Post[];
    });

    it('should return empty array', () => {  // how to detect next() to compare non-empty array?
      postService.posts.subscribe(
        posts => expect(posts.length).toEqual(0, 'initialy should return empty array and after service get empty list of posts'), 
        fail
      );

      // PostService should have made two requests (one in the constructor) to GET heroes from expected URL
      const req = httpTestingController.expectOne(apiUrl);

      // Respond to each request with mock post results
      req.flush({ posts: [] });
    });

    it('should return post list of length 0 or 1', () => {  // how to detect next() to compare non-empty array?
      postService.posts.subscribe(
        posts => {
          expect(posts.length).toBeLessThan(2, 'initialy should return empty array and then with just 1 element, never more then 1 element');
        }, 
        fail
      );
      
      // PostService should have made two requests (one in the constructor) to GET heroes from expected URL
      const req = httpTestingController.expectOne(apiUrl);

      // Respond to each request with mock post results
      req.flush({ posts: expectedPosts });
    });

  });

  describe('#createPost', () => {
    let expectedPosts : Post[];
    beforeEach(() => {
      expectedPosts = [
              {
                id: "1",
                title: "title1",
                link: "link1",
                completed: false,
                created: new Date().toDateString()
              }
            ] as Post[];
    });

    it('should create and return a post', () => { 
      postService.createPost(expectedPosts[0]).subscribe(
        response => expect(response.post).toEqual(expectedPosts[0], 'should create and return post'), 
        fail
      );

      // PostService should have made two requests (one in the constructor) to GET heroes from expected URL
      const requests = httpTestingController.match(apiUrl);
      expect(requests.length).toEqual(2, 'calls to API endpoint');
      expect(requests[0].request.method).toEqual('GET');
      expect(requests[1].request.method).toEqual('POST');

      // Respond to each request with mock post results
      requests[0].flush({ posts: [] });
      requests[1].flush({ ok: true, post: expectedPosts[0] });
    });

  });

  describe('#removePost', () => {
    let expectedPosts : Post[];
    beforeEach(() => {
      expectedPosts = [
              {
                id: "1",
                title: "title1",
                link: "link1",
                completed: false,
                created: new Date().toDateString()
              }
            ] as Post[];
    });

    it('should remove and return { ok: true }', () => { 
      postService.removePost('1').subscribe(
        response => expect(response.ok).toEqual(true, 'should remove a post and return truthy ok value'), 
        fail
      );

      // PostService should have made two requests (one in the constructor) to GET heroes from expected URL
      const getAllReq = httpTestingController.expectOne(apiUrl, 'call to get all posts');
      const removeReq = httpTestingController.expectOne(apiUrl + '1', 'calls to remove the post');
      expect(getAllReq.request.method).toEqual('GET');
      expect(removeReq.request.method).toEqual('DELETE');

      // Respond to each request with mock post results
      getAllReq.flush({ posts: expectedPosts });
      removeReq.flush({ ok: true });
    });

  });

});
