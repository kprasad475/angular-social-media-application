import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../post.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Post } from '../post-model';

import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  animations: [
    trigger('postAnimation', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public service: PostService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.posts = this.service.getPosts(); // Get initial posts
    this.postsSub = this.service.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        console.log('Updated Posts:', posts); // This should log updated posts
        this.posts = posts;
      });
  }
  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/hand-drawn-bharatanatyam-illustration_52683-94024.jpg'; // Fallback image
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
