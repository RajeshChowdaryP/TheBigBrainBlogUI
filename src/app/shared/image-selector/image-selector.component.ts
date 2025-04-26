import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ImageService } from 'src/app/features/services/image.service';

@Component({
  selector: 'app-image-selector',
  standalone: false,
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.scss'
})
export class ImageSelectorComponent implements OnInit {
  @Output() showImageSelector: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('form', {static: false}) imageForm: NgForm; // Reference to the form in the template
  private selectedImageFile?: File = null;
  fileName: string = '';
  title: string = '';

  takeUntilDestroy$: any = new Subject<any>();
  images$: Observable<any[]> = new Observable<any[]>(); // Observable to hold the images

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.getImages(); // Fetch images when the component initializes
  }

  close() {
    // Logic to close the image selector modal or component
    this.imageForm?.resetForm(); // Reset the form when closing
    this.showImageSelector.emit(false);
  }

  onFileUpload(event: Event): void {
    const file = event.currentTarget as HTMLInputElement;
    this.selectedImageFile = file.files?.[0];
  }

  onSubmit(form: NgForm): void {
    if (this.selectedImageFile && this.fileName !== '' && this.title !== '') {
      this.imageService.uploadImage(this.selectedImageFile, this.fileName, this.title).subscribe({
        next: (response) => {
          console.log('Image uploaded successfully:', response);
          form?.resetForm(); // Reset the form after successful upload
          this.getImages(); // Refresh the images list
          // this.close(); // Close the image selector after successful upload
        },
        error: (error) => {
          console.error('Error uploading image:', error);
        }
      });
    } else {
      console.error('No file selected');
    }
  }

  private getImages() {
    this.images$ = this.imageService.getAllImages();
  }

  selectedImage(image: any) {
    this.imageService.selectedImageFile.next(image); // Emit the selected image to the service
    this.close(); // Close the image selector after selecting an image
  }

  // ngOnDestroy() {
  //   this.takeUntilDestroy$.unsubscribe(); // Unsubscribe from the Subject to prevent memory leaks
  // }

}
