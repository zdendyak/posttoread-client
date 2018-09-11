import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostCompletedComponent } from './post-completed.component';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostService } from '../../services/post.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CompletedPipe } from '../../pipes/completed.pipe';

describe('PostCompletedComponent', () => {
  let component: PostCompletedComponent;
  let fixture: ComponentFixture<PostCompletedComponent>;
  let postServiceStub: PostService;
  let toastrServiceStub: ToastrService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, ToastrModule.forRoot() ], 
      declarations: [ PostCompletedComponent, PostCardComponent, CompletedPipe ],
      providers: [ 
        PostService, ToastrService
        // { provide: PostService, useValue: postServiceStub }, 
        // { provide: ToastrService, useValue: toastrServiceStub } 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCompletedComponent);
    component = fixture.componentInstance;
    postServiceStub = TestBed.get(PostService);
    toastrServiceStub = TestBed.get(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
