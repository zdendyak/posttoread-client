import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../../post';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {

  post: Post = {
    title: "",
    link: "",
    note: "",
    category: "",
    completed: false
  };

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private postService: PostService, private toastr: ToastrService,
              private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getPost();
    
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.getPostById(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(post => {
                  this.post = post;
                },
                error => {
                  this.toastr.error('Error occurred during fetching post data');
                  console.error(error);
                });
  }

  updatePost() {
    this.postService.updatePost(this.post)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result: any) => {
        console.log('result in update', result);
        if (result.ok) {
          this.toastr.success('Post was successfully updated');
        } else {
          this.toastr.error('Error occurred during updating post data');
        }
      }, error => {
        this.toastr.error('Error occurred during updating post data');
        console.error(error);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

}
