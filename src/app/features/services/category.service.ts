import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCategory } from 'src/app/model/AddCategoryRequest';
import { Category } from 'src/app/model/Category';
import { UpdateCategory } from 'src/app/model/UpdateCategory';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(category: AddCategory): Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}Categories/CreateCategory`,category);

  }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiBaseUrl}Categories/GetAllCategories`);
  }

  getSelectedCategory(id: string): Observable<Category>{
    return this.http.get<Category>(`${environment.apiBaseUrl}Categories/GetCategoryById=${id}`);
  }

  updateSelectedCategoryValues(id,categoryData): Observable<Category>{
    let categoryItem: UpdateCategory = {
      name: categoryData.name,
      urlHandle: categoryData.urlHandle

    }
    return this.http.put<Category>(`${environment.apiBaseUrl}Categories/UpdateCategory/${id}`,categoryItem);
  }

  deleteCategory(id){
    return this.http.delete<Category>(`${environment.apiBaseUrl}Categories/DeleteCategory/${id}`);
  }
}
