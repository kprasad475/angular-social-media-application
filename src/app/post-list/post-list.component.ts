import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { Post } from '../post-model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
  animations: [
    trigger('postState', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ opacity: 0, transform: 'translateX(100px)' }))
      ])
    ])
  ]
})
export class PostListComponent implements OnInit,OnDestroy{
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public service:PostService, private sanitizer: DomSanitizer){}

  ngOnInit() {
    this.posts = this.service.getPosts();
    this.postsSub = this.service.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.service.deletePost(postId);
  }

  getSanitizedUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
  onLike(post: Post) {
    // Implement like functionality
  }

  onComment(post: Post) {
    // Implement comment functionality
  }

  onShare(post: Post) {
    // Implement share functionality
  }
}
