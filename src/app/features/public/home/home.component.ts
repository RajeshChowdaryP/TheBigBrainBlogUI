import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../services/blogpost.service';
import { map, Observable, of, startWith } from 'rxjs';
import { BlogPost } from 'src/app/model/blogPost';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private blogPostService: BlogpostService, private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Fetch all blog posts from the service and subscribe to the observable
    this.blogPostService.getAllBlogPosts().subscribe((data) => {
      // Assign the fetched data to the local variable `blogPosts`
      this.blogPosts = data;

      // Create a new observable `blogs$` that reacts to changes in the search input field
      this.blogs$ = this.searchText.valueChanges.pipe(
        // `startWith` initializes the observable with an empty string as the default search value
        startWith(''),

        // `map` transforms the emitted value (search text) into a filtered list of blog posts
        map((value) =>
          // Filter the blog posts based on whether their title includes the search text
          this.blogPosts.filter((blogPost) =>
            blogPost.title.toLowerCase().includes(value.toLowerCase())
          )
        )
      );
    });
  }

  goToBlogDetails(url: string) {
    // if (!this.checkLoggedIn()) {
    //   this.route.navigateByUrl('/Login');
    // }
    // else {
      this.route.navigateByUrl('/Blog/' + url);
    // }
  }

  // checkLoggedIn(): boolean {
  //   // Check if the user is logged in using the AuthService
  //   return this.authService.isLoggedIn();
  // }

}
