import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/model/blogPost';
import { BlogpostService } from '../../services/blogpost.service';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.scss'],
})
export class BlogpostListComponent implements OnInit {

  blogPosts$?: Observable<BlogPost[]> = new Observable<BlogPost[]>();

  constructor(private blogPostsService: BlogpostService) { }

  ngOnInit(): void {
    this.blogPosts$ = this.blogPostsService.getAllBlogPosts();
    // this.blogPostsService.getAllBlogPosts().subscribe({
    //   next: response => {
    //     this.blogPosts = response;
    //   },
    //   error: er => {
    //     console.log(er);
    //   }
    // })
  }

}
