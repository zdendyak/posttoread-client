import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../post';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input() post: Post;
  @Output() deletePost = new EventEmitter<string>();
  @Output() completePost = new EventEmitter<object>();
 
  constructor() { }

  ngOnInit() {
  }

  complete(val) {
    const id = this.post.id || this.post._id;
    this.completePost.emit({ id, val });
  }

  removePost() {
    const id = this.post.id || this.post._id;
    this.deletePost.emit(id);
  }

}
