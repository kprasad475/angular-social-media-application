import { Injectable } from '@angular/core';
import { Post } from './post-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, description: string, imagePath: string) {
    const post: Post = { id: (Math.random() * 1000).toString(), title, description, imagePath };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

  updatePost(id: string, title: string, description: string, imagePath: string) {
    const updatedPosts = [...this.posts];
    const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
    const post: Post = { id, title, description, imagePath };
    updatedPosts[oldPostIndex] = post;
    this.posts = updatedPosts;
    this.postsUpdated.next([...this.posts]);
  }

  deletePost(postId: string) {
    this.posts = this.posts.filter(post => post.id !== postId);
    this.postsUpdated.next([...this.posts]);
  }
}
