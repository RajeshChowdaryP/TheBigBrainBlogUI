import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/model/blogPost';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  blogs$?: Observable<BlogPost[]> = undefined;
  constructor(private blogPostService: BlogpostService) { }

  ngOnInit(): void {
    // Initialize component
    this.blogs$ = this.blogPostService.getAllBlogPosts();
  }

}
