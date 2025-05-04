import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCategory } from 'src/app/model/AddCategoryRequest';
import { Category } from 'src/app/model/Category';
import { UpdateCategory } from 'src/app/model/UpdateCategory';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  addCategory(category: AddCategory): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}Categories/CreateCategory?addAuth=true`, category);

  }

  getAllCategories(queryParam?: string, sortBy?: string, sortDirection?: string): Observable<Category[]> {
    let params = new HttpParams();
    if (queryParam) {
      params = params.set('query', queryParam);
    }

    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }

    if (sortDirection) {
      params = params.set('sortDirection', sortDirection);
    }

    return this.http.get<Category[]>(`${environment.apiBaseUrl}Categories/GetAllCategories`, { params: params });
  }

  getSelectedCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiBaseUrl}Categories/GetCategoryById=${id}`);
  }

  updateSelectedCategoryValues(id, categoryData): Observable<Category> {
    let categoryItem: UpdateCategory = {
      name: categoryData.name,
      urlHandle: categoryData.urlHandle

    }
    // ?addAuth=true is used to add the JWT token in the header of the request only if it is required in the API and we have to pass it as a query parameter in the URL and this we will handle in the interceptor
    return this.http.put<Category>(`${environment.apiBaseUrl}Categories/UpdateCategory/${id}?addAuth=true`, categoryItem);

    // 1 way to pass the JWT token in the header but there is better way (2nd way) to do it using interceptors in angular

    // return this.http.put<Category>(`${environment.apiBaseUrl}Categories/UpdateCategory/${id}`, categoryItem,
    //   {
    //     headers: {
    //       'Authorization': `${this.cookieService.get('Authorization')}`, // token saved key in cookies and its value is the token
    //     }
    //   }
    // );
  }

  deleteCategory(id) {
    return this.http.delete<Category>(`${environment.apiBaseUrl}Categories/DeleteCategory/${id}?addAuth=true`);
  }
}
