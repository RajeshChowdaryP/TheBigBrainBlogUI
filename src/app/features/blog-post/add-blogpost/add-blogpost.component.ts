import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddBlogPost } from 'src/app/model/add-blog-post';
import { BlogpostService } from '../../services/blogpost.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/Category';
import { CategoryService } from '../../services/category.service';
import { marked } from 'marked';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.scss'],
  providers: [DatePipe]
})
export class AddBlogpostComponent implements OnInit {

  formData: AddBlogPost = {
    title: '',
    urlHandle: '',
    shortDescription: '',
    content: '',
    featuredImgUrl: '',
    publishedDate: new Date(),
    author: '',
    isVisible: true,
    categories: [],
  };

  categories: Category[]; // Replace with actual categories

  syncScrollEnabled = false; // Flag to control scroll synchronization

  @ViewChild('contentTextarea') contentTextarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('markdownPreview') markdownPreview!: ElementRef<HTMLDivElement>;


  constructor(private datePipe: DatePipe, private blogPostService: BlogpostService, private router: Router,
    private categoryService: CategoryService
  ) {

  }

  ngOnInit(): void {
    // this.formData.publishedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  onSubmit(form: any) {
    // console.log('Form submitted:', this.formData);
    if (form.valid) {
      this.blogPostService.addBlogPost(this.formData).subscribe({
        next: val => {
          this.router.navigateByUrl('/Admin/BlogPosts');
        },
        error: er => {
          console.error(er);
        }
      });
    }
  }

  showContentPreview = false;
  toggleContentPreview() {
    if (this.formData.content || this.formData.content.length > 0) {
      this.showContentPreview = !this.showContentPreview;
    }
    else {
      this.showContentPreview = false;
    }
  }

  showImgPreview = false;
  toggleImgPreview() {
    if (this.formData.featuredImgUrl || this.formData.featuredImgUrl.length > 0) {
      this.showImgPreview = !this.showImgPreview;
    }
    else {
      this.showImgPreview = false;
    }
  }

  syncScroll(event: Event, source: 'textarea' | 'preview'): void {
    if(!this.syncScrollEnabled) return; // Only sync if enabled
    const textarea = this.contentTextarea.nativeElement;
    const preview = this.markdownPreview.nativeElement;

    if (source === 'textarea') {
      // Sync Markdown preview scroll with textarea scroll
      const scrollRatio = textarea.scrollTop / (textarea.scrollHeight - textarea.clientHeight);
      preview.scrollTop = scrollRatio * (preview.scrollHeight - preview.clientHeight);
    } else if (source === 'preview') {
      // Sync textarea scroll with Markdown preview scroll
      const scrollRatio = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
      textarea.scrollTop = scrollRatio * (textarea.scrollHeight - textarea.clientHeight);
    }
  }

  selectedOptions(selectedIds: string[]) {
    this.formData.categories = selectedIds;
    // console.log('Selected categories:', this.formData.categories);
  }

}
