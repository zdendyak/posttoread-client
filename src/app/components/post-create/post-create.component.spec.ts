import { async, ComponentFixture, TestBed, fakeAsync, tick, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostCreateComponent } from './post-create.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PostService } from '../../services/post.service';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';

function newEvent(eventName: string, bubbles = false, cancelable = false) {
  let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

describe('PostCreateComponent', () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;
  let titleInput, linkInput, catInput, noteInput, submitBtn;
  const newPost = {
      id: "1",
      title: "title",
      link: "link",
  }
  const createPostResponse = {
    ok: true,
    post: { id: "1", ...newPost}
  }
  const postService = jasmine.createSpyObj('PostService', ['createPost']);
  const createPostSpy = postService.createPost.and.returnValue( of(createPostResponse))
  const toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
  const successToastrSpy = toastrService.success.and.returnValue(true);
  const errorToastrSpy = toastrService.error.and.returnValue('error');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule, ToastrModule.forRoot() ],
      declarations: [ PostCreateComponent ],
      providers: [
        // { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: PostService, useValue: postService},
        { provide: ToastrService, useValue: toastrService }
      ]
    })
    // .overrideComponent(PostCreateComponent, {
    //   set: { changeDetection: ChangeDetectionStrategy.Default }
    // })
    .compileComponents();
  }));

  beforeEach(async() => {
    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;
    titleInput = fixture.debugElement.query(By.css('input[id=title]')).nativeElement;
    linkInput = fixture.debugElement.query(By.css('input[id=link]')).nativeElement;
    noteInput = fixture.debugElement.query(By.css('textarea[id=note]')).nativeElement;
    catInput = fixture.debugElement.query(By.css('input[id=category]')).nativeElement;
    submitBtn = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be empty fields and submit btn disabled', () => {
    expect(titleInput.textContent).toEqual('');
    expect(linkInput.textContent).toEqual('');
    expect(catInput.textContent).toEqual('');
    expect(noteInput.textContent).toEqual('');
    expect(submitBtn.disabled).toBeTruthy();
  });

  it('should be submit btn enabled when there is non-empty title and link', fakeAsync(() => {
    titleInput.value = "title";
    linkInput.value = "http://exemple.com";
    titleInput.dispatchEvent(newEvent('input'));
    linkInput.dispatchEvent(newEvent('input'));
    tick();
    fixture.detectChanges();
    expect(component.post.title).toEqual("title");
    expect(component.post.link).toEqual("http://exemple.com");
    expect(submitBtn.disabled).toBeFalsy();
  }));

  it('should create a new post and show a success message', () => {
    expect(createPostSpy.calls.any()).toBe(false, 'createPost not yet called');
    component.post = newPost;
    fixture.detectChanges();
    submitBtn.click();
    expect(createPostSpy).toHaveBeenCalledWith(newPost);
    postService.createPost().subscribe((response: any) => {
      expect(response.ok).toBeTruthy();
      expect(response.post.id).toEqual('1');
    });
    expect(successToastrSpy).toHaveBeenCalledWith('New post was successfully created');
    expect(errorToastrSpy.calls.any()).toBe(false, 'error message have not been shown');
    expect(component.post).toEqual({
      title: "",
      link: "",
      note: "",
      category: ""
    });
  });

  it('should show an error message when response.ok === false', fakeAsync(() => {
    component.post = newPost;
    fixture.detectChanges();
    createPostSpy.and.returnValue(
      of({ ok: false }));
    submitBtn.click();
    postService.createPost().subscribe((response: any) => {
      expect(response.ok).toBe(false);
      // expect(successToastrSpy.calls.any()).toBe(false, 'success message have not been shown');  // TODO: fix it
      expect(errorToastrSpy).toHaveBeenCalledWith('Error occurred during saving a new post');
    }, fail);
    tick();
    fixture.detectChanges();
    expect(component.post).toEqual(newPost);
  }));

  it('should show an error message when createPost fails', fakeAsync(() => {
    component.post = newPost;
    fixture.detectChanges();
    createPostSpy.and.returnValue(
      throwError('Fails'));
    submitBtn.click();
    postService.createPost().subscribe((response: any) => {
    }, error => {
      expect(error).toEqual('Fails');
      // expect(successToastrSpy.calls.any()).toBe(false, 'success message have not been shown');  // TODO: fix it
      expect(errorToastrSpy).toHaveBeenCalledWith('Error occurred during saving a new post');
    });
    tick();
    fixture.detectChanges();
    expect(component.post).toEqual(newPost);
  }));

});
