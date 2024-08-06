import { Injectable } from '@angular/core';
import { Post } from './post-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor() {
    this.posts = [
      { id: '1', title: 'Sample Post 1', description: 'This is a sample post.', imagePath: 'https://example.com/image1.jpg' },
      { id: '2', title: 'Sample Post 2', description: 'This is another sample post.', imagePath: 'https://example.com/image1.jpg' }
    ];
    this.postsUpdated.next([...this.posts]); // Emit the initial posts
  }

  getPosts() {
    return [...this.posts];
    console.log(this.posts)
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }


  addPost(title: string, description: string, imagePath: string) {
    const post: Post = { id: Date.now().toString(), title, description, imagePath }; // Assign an ID
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

  updatePost(id: string, title: string, description: string, imagePath: string) {
    const updatedPosts = [...this.posts];
    const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
    if (oldPostIndex === -1) {
      return; // Handle the case where the post doesn't exist
    }
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
