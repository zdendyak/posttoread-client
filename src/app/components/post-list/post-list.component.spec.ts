import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostListComponent } from './post-list.component';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostService } from '../../services/post.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CompletedPipe } from '../../pipes/completed.pipe';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
