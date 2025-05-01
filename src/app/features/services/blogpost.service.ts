import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBlogPost } from 'src/app/model/add-blog-post';
import { BlogPost } from 'src/app/model/blogPost';
import { environment } from 'src/app/environments/environment';
import { UpdateBlogPost } from 'src/app/model/UpdateBlogPost';
//import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http: HttpClient) { }

  addBlogPost(post: AddBlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(environment.apiBaseUrl + 'BlogPosts/CreateBlogPost?addAuth=true', post);
  }

  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(environment.apiBaseUrl + 'BlogPosts/GetAllBlogPosts');
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(environment.apiBaseUrl + 'BlogPosts/GetBlogPostById/' + id);
  }

  updateBlogPost(id, post: UpdateBlogPost): Observable<BlogPost> {
    const data: UpdateBlogPost = {
      title: post.title,
      content: post.content,
      publishedDate: post.publishedDate,
      featuredImgUrl: post.featuredImgUrl,
      categories: post.categories, // Map the categories to their IDs
      shortDescription: post.shortDescription,
      isVisible: post.isVisible,
      urlHandle: post.urlHandle,
      author: post.author
    };
    return this.http.put<BlogPost>(environment.apiBaseUrl + 'BlogPosts/UpdateBlogpostById/' + id + '?addAuth=true', data);
  }

  deleteBlogPost(id: string): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + 'BlogPosts/DeleteBlogPost/' + id + '?addAuth=true');
  }

  getBlogPostByUrl(url: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(environment.apiBaseUrl + 'BlogPosts/GetBlogPostByUrlHandle/' + url);
  }
}
