import { Pipe, PipeTransform } from '@angular/core';

import { Post } from '../post';
@Pipe({
  name: 'completed'
})
export class CompletedPipe implements PipeTransform {

  transform(allPosts: Post[], completed: boolean): Post[] {
    return allPosts && allPosts.filter(post => post.completed === completed) || [];
  }

}
