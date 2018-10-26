import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostListComponent } from './post-list.component';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostService } from '../../services/post.service';
import { PostRestService } from '../../services/post-rest.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CompletedPipe } from '../../pipes/completed.pipe';
import { of, defer } from 'rxjs';

import { Post, PostResponse } from '../../post';

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postServiceStub: PostService;
  let toastrServiceStub: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, ToastrModule.forRoot() ],
      declarations: [ PostListComponent, PostCardComponent, CompletedPipe ],
      providers: [ 
        PostService, ToastrService
        // { provide: PostService, useValue: postServiceStub }, 
        // { provide: ToastrService, useValue: toastrServiceStub } 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    postServiceStub = TestBed.get(PostService);
    toastrServiceStub = TestBed.get(ToastrService);
  });
  
  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not have any posts after construction', async() => {
    expect(component.posts).toBeUndefined(); 
    fixture.detectChanges(); // ngOnInit();
    expect(component.posts.length).toEqual(0);  
  });

  it('should have posts after Angular calls ngOnInit', async() => {
    const post1: Post = {
      _id: "1",
      title: "title1",
      link: "link1",
      completed: false,
      created: new Date().toDateString(),
      note: "",
      category: ""
    };
    const post2: Post = {
      id: "2",
      title: "title2",
      link: "link2",
      completed: false,
      created: new Date().toDateString()
    };
    const postResponse:  PostResponse = {
      ok: true,
      posts: [
        post1,
        post2
      ]
    };
    
    const service: PostRestService = TestBed.get(PostRestService);
    let posts;
    spyOn(postServiceStub, 'getService').and.returnValue(service);

    spyOnProperty(service, 'posts', 'get').and.returnValue(asyncData(postResponse.posts));
    service.posts.subscribe(res => {
      posts = res;
      expect(posts).toEqual(postResponse.posts);
    });
    
    fixture.detectChanges();   // ngOnInit()

    fixture.whenStable().then(() => { // wait for async $posts
      fixture.detectChanges();       
      expect(component.posts).toEqual(postResponse.posts);
    });
  });
});
