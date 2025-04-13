import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBlogPost } from 'src/app/model/add-blog-post';
import { BlogPost } from 'src/app/model/blogPost';
import { environment } from 'src/app/environments/environment';
//import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http: HttpClient) { }

  addBlogPost(post: AddBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(environment.apiBaseUrl + 'BlogPosts/CreateBlogPost', post);
  }

  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(environment.apiBaseUrl + 'BlogPosts/GetAllBlogPosts');
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(environment.apiBaseUrl + 'BlogPosts/GetBlogPostById/' + id);
  }
}
