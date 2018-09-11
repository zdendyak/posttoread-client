import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostUpdateComponent } from './post-update.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('PostUpdateComponent', () => {
  let component: PostUpdateComponent;
  let fixture: ComponentFixture<PostUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule ],
      declarations: [ PostUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
