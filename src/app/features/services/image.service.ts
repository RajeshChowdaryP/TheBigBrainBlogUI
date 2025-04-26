import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { BlogImage } from 'src/app/model/BlogImage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  selectedImageFile: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
     id: '', 
     fileName: '', 
     filePath: '',  
     url: '', 
     title: '', 
     createdDate: new Date(Date.now())
    }); // Property to hold the selected image file

  constructor(private http: HttpClient) { }

  uploadImage(file: File, fileName: string, title: string): Observable<BlogImage> {
    const ImageFormData = new FormData();
    ImageFormData.append('file', file);
    ImageFormData.append('fileName', fileName);
    ImageFormData.append('title', title);
    return this.http.post<BlogImage>(`${environment.apiBaseUrl}Images/UploadImage`, ImageFormData);
  }

  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(`${environment.apiBaseUrl}Images/GetAllImages`);
  }

  selectImage(image: BlogImage): void {
    this.selectedImageFile.next(image); // Emit the selected image file to subscribers
  }

  onImageSelected(): Observable<BlogImage> {
    return this.selectedImageFile.asObservable(); // Return an observable of the selected image file
  }
}
