import { Component, OnInit } from '@angular/core';
import { Post } from '../../post';
import { PostService } from '../../services/post.service';
import { ToastrService } from 'ngx-toastr';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-post-completed',
  templateUrl: './post-completed.component.html',
  styleUrls: ['./post-completed.component.css']
})
export class PostCompletedComponent implements OnInit {

  posts: Post[];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public postService: PostService, private toastr: ToastrService) { }

  ngOnInit() {
    this.postService.getService().posts.subscribe(posts => { 
        this.posts = posts;
        this.posts = this.posts.slice();  // to run completed pipe 
      });
  }

  deletePost(id) {
    console.log('try remove post with id ', id);
    this.postService.removePost(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result: any) => {
        if (result.ok) {
          this.toastr.success('Post was successfully deleted');
        } else {
          this.toastr.error('Cannot delete post. Please try again');
          console.log(result);
        }
      })

  }

  completePost({ id, val }) {
    this.postService.completePost(id, val)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result: any) => {
        if (result.ok) {
          this.toastr.success('Post was successfully updated');
        } else {
          this.toastr.error('Cannot update post data. Please try again');
          console.log(result);
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

}
