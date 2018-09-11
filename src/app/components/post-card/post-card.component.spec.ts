import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostCardComponent } from './post-card.component';
import { PostService } from '../../services/post.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';


describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;

  let mockPost;


  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, ToastrModule.forRoot() ],
      declarations: [ PostCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;

    mockPost = {
      _id: "1",
      title: "Title",
      link: "www.example.com",
      completed: false,
      note: "note",
      category: "category",
      created: new Date().toDateString() 
    }

    component.post = mockPost;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render post title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.card-title').textContent).toContain(mockPost.title);
  });

  it('should render post note', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.post-note').textContent).toContain(mockPost.note);
  });

  it('should render uncompleted status', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.complete-button').textContent).toContain('Uncompleted');
  });

  it('should render completed status', () => {
    mockPost.completed = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.complete-button').textContent).toContain('Completed');
  });

  // Add clicking event tests: complete, uncomplete
  it('should raise deletePost event with id value', () => {
    let expectedId: string;
    component.deletePost.subscribe((id: string) => expectedId = id);
    const removeEl = fixture.debugElement.query(By.css('.delete-btn'));
    removeEl.triggerEventHandler('click', null);
    expect(expectedId).toEqual(mockPost._id);
  });

  it('should raise completePost event with id value', () => {
    let expectedId: string;
    component.completePost.subscribe((obj: any) => {
      expectedId = obj.id;
    });
    const completeEl = fixture.debugElement.query(By.css('.complete-button'));
    completeEl.triggerEventHandler('click', null);
    expect(expectedId).toEqual(mockPost._id);
  });

  it('should raise completePost event with true value', () => {
    let expectedBool: boolean;
    component.completePost.subscribe((obj: any) => {
      expectedBool = obj.val;
    });
    const completeEl = fixture.debugElement.query(By.css('.complete-button'));
    completeEl.triggerEventHandler('click', null);
    expect(expectedBool).toEqual(!mockPost.completed);
  });

  it('should raise completePost event with false value', () => {
    let expectedBool: boolean;
    component.post.completed = !mockPost.completed;
    component.completePost.subscribe((obj: any) => {
      expectedBool = obj.val;
    });
    const completeEl = fixture.debugElement.query(By.css('.complete-button'));
    completeEl.triggerEventHandler('click', null);
    expect(expectedBool).toEqual(mockPost.completed);
  });
});
