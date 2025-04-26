import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../services/blogpost.service';
import { Observable, of } from 'rxjs';
import { BlogPost } from 'src/app/model/blogPost';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  blogs$?: Observable<BlogPost[]> = undefined;

  searchText: FormControl = new FormControl('');
  blogPosts: BlogPost[] = [];

  constructor(private blogPostService: BlogpostService) { }

  
  ngOnInit(): void {
    // Initialize component
    this.blogs$ = this.blogPostService.getAllBlogPosts();

    this.blogPostService.getAllBlogPosts().subscribe((data) => {
      this.blogPosts = data;
    });

    this.searchText.valueChanges.subscribe((value) => {
      const filteredPosts = this.blogPosts.filter((blogPost) => { return blogPost.title.toLowerCase().includes(value.toLowerCase());
      });
      this.blogs$ = of(filteredPosts);
    });
  }

}
