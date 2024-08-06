import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;

  constructor(private fb: FormBuilder,private service:PostService) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      imagePath: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  ngOnInit(): void {}

  getErrorMessage(field: string): string {
    const control = this.postForm.get(field);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (control?.hasError('minlength')) {
      return `Minimum length for ${field} is ${control.errors?.['minlength']?.requiredLength}`;
    }
    if (control?.hasError('pattern')) {
      return 'Enter a valid URL';
    }
    return '';
  }

  onAddPost(): void {
    if (this.postForm.valid) {
      const postData = this.postForm.value;
      console.log('Before adding post:', this.service.getPosts());

      this.service.addPost(postData.title, postData.description, postData.imagePath);
      console.log('After adding post:', this.service.getPosts());

      this.postForm.reset();
      this.postForm.markAsPristine();
      this.postForm.markAsUntouched();
    } else {
      this.postForm.markAllAsTouched();
      console.log('Form Status:', this.postForm.status);
      console.log('Form Values:', this.postForm.value);
      console.log('Form Controls:', this.postForm.controls);
    }
  }
}
