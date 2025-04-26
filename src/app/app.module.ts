import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownComponent } from "./shared/drop-down/drop-down.component";
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { ImageSelectorComponent } from "./shared/image-selector/image-selector.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddBlogpostComponent,
    BlogpostListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    CategoryListComponent,
    DropDownComponent,
    EditBlogpostComponent,
    ImageSelectorComponent,
    // Other components...
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}