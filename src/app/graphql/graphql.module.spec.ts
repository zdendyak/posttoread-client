import { GraphqlModule } from './graphql.module';
import {TestBed, inject} from '@angular/core/testing';
import {Apollo} from 'apollo-angular';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GraphqlModule', () => {
  let graphqlModule: GraphqlModule;
  let apollo: Apollo;
  let backend: HttpLink;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [ApolloTestingModule, HttpClientTestingModule, HttpLinkModule ],
  //     providers: [HttpLink]
  //   });
  //   apollo = TestBed.get(Apollo);
  //   backend = TestBed.get(HttpLink);
  //   graphqlModule = new GraphqlModule(apollo, backend);
  // });


  // it('should create an instance', () => {
  //   expect(graphqlModule).toBeTruthy();
  // });
});
