import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [ { path: 'list', component: PostListComponent },
  { path: 'post', component: PostCreateComponent },
  { path: 'edit/:id', component: PostUpdateComponent },
  { path: '', component: NavbarComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
