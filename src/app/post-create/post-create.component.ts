import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {

  postForm: FormGroup;

  constructor(public service: PostService) {
    this.postForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      imagePath: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.postForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength']?.requiredLength}`;
    }
    return '';
  }
  onAddPost() {
    console.log(this.postForm.value); // Log form values
    console.log(this.postForm.valid); // Log form validity
    if (this.postForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    console.log('Form is valid, adding post');
    this.service.addPost(
      this.postForm.value.title,
      this.postForm.value.description,
      this.postForm.value.imagePath
    );
    this.postForm.reset();
  }
}
