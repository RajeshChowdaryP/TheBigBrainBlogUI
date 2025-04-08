import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';

const routes: Routes = [
  // {path: '', component: CategoryListComponent},
  {path: 'Admin/Categories', component: CategoryListComponent},
  {path: 'Admin/Categories/Add', component: AddCategoryComponent},
  {path: 'Admin/Categories/:id', component: EditCategoryComponent},
  {path: 'Admin/BlogPosts', component: BlogpostListComponent},
  {path: 'Admin/BlogPosts/Add', component: AddBlogpostComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
