import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostService } from './post.service';

describe('PostService', () => {
  let postService: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [PostService]
    });

    postService = TestBed.get(PostService);
  });

  it('should be created', () => {
    expect(postService).toBeTruthy();
  });
});
