import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

import { ToastrService } from 'ngx-toastr';

import { Post } from '../../post';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  post: Post = {
    title: "",
    link: "",
    note: "",
    category: ""
  }

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private postService: PostService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  savePost() {
    this.postService.createPost(this.post)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result: any) => {
        if (result.ok) {
          this.clearPostData();
          this.toastr.success('New post was successfully created');
        } else {
          this.toastr.error('Error occurred during saving a new post');
        }
      }, (error) => {
        this.toastr.error('Error occurred during saving a new post');
        console.error(error);
      });
  }

  clearPostData () {
    this.post  = {
      title: "",
      link: "",
      note: "",
      category: ""
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

}
