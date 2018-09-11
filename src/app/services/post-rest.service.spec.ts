import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostRestService } from './post-rest.service';

describe('PostRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [PostRestService]
    });
  });

  it('should be created', inject([PostRestService], (service: PostRestService) => {
    expect(service).toBeTruthy();
  }));
});
