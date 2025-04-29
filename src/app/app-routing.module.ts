import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component'
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Blog/:url', component: BlogDetailsComponent},
  {path: 'Admin/Categories', component: CategoryListComponent},
  {path: 'Admin/Categories/Add', component: AddCategoryComponent},
  {path: 'Admin/Categories/:id', component: EditCategoryComponent},
  {path: 'Admin/BlogPosts', component: BlogpostListComponent},
  {path: 'Admin/BlogPosts/Add', component: AddBlogpostComponent},
  {path: 'Admin/BlogPosts/:id', component: EditBlogpostComponent},
  {path: '**', redirectTo: ''} // Redirect to home for any unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
