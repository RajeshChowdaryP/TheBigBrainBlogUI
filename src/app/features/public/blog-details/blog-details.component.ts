import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from '../../services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/model/blogPost';

@Component({
  selector: 'app-blog-details',
  standalone: false,
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent implements OnInit {
  url: string | null = null;
  blogpost$: Observable<BlogPost> | undefined = undefined;

  constructor(private activeRoute: ActivatedRoute, private blogPostService: BlogpostService) { }

  ngOnInit(): void {
    // Initialize component
    this.activeRoute.paramMap.subscribe((params) => {
      this.url = params.get('url');
      if (this.url) {
        this.blogpost$ = this.blogPostService.getBlogPostByUrl(this.url);
      }
    });
  }

}
