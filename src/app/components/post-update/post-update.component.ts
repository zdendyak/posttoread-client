import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../../post';

import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

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
  originalPost: Post = {
    title: "",
    link: "",
    note: "",
    category: "",
    completed: false
  };

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private postService: PostService, private toastr: ToastrService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(pmap => this.getPost(pmap.get('id')));
  }

  getPost(id) {
    this.postService.getPostById(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(post => {
                  this.post = post;
                  this.originalPost = Object.assign({}, post);
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
        if (result.ok) {
          this.toastr.success('Post was successfully updated');
          this.post.completed ? this.router.navigate(['/completed']) : this.router.navigate(['/posts'])
        } else {
          this.toastr.error('Error occurred during updating post data');
        }
      }, error => {
        this.toastr.error('Error occurred during updating post data');
        console.error(error);
      });
  }

  isUpdated () {
    for (let key of Object.keys(this.post)) {
      if (this.post[key] !== this.originalPost[key]) return true;
    }
    return false;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

}
