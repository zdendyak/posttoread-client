import { TestBed, inject } from '@angular/core/testing';
import {
  ApolloTestingModule,
} from 'apollo-angular/testing';

import { PostGraphQLService } from './post-graphql.service';

describe('PostGraphQLService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ApolloTestingModule ],
      providers: [PostGraphQLService]
    });
  });

  it('should be created', inject([PostGraphQLService], (service: PostGraphQLService) => {
    expect(service).toBeTruthy();
  }));
});
