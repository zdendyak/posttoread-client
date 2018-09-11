import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Components
import { AppComponent } from './app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostCompletedComponent } from './components/post-completed/post-completed.component';
import { PostUpdateComponent } from './components/post-update/post-update.component';
import { PostCardComponent } from './components/post-card/post-card.component';

// Apollo
import { GraphqlModule } from './graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';

// Services
import { PostGraphQLService } from './services/post-graphql.service';
import { PostRestService } from './services/post-rest.service';
import { PostService } from './services/post.service';
import { SwitchRestGqlService } from './services/switch-rest-gql.service';
import { Post } from './graphql/graphql-queries';
import { CompletedPipe } from './pipes/completed.pipe';


const appRoutes: Routes = [
  { path: 'posts', component: PostListComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'add-post', component: PostCreateComponent },
  { path: 'completed', component: PostCompletedComponent },
  { path: 'edit/:id', component: PostUpdateComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostCreateComponent,
    PostCompletedComponent,
    PostUpdateComponent,
    PostCardComponent,
    CompletedPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GraphqlModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    PostGraphQLService,
    PostRestService,
    SwitchRestGqlService,
    PostService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
