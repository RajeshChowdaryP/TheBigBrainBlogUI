import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BlogpostService } from '../../services/blogpost.service';
import { BlogPost } from 'src/app/model/blogPost';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/model/Category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.scss'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  blogPostId: string | null = null;
  destroy$ = new Subject(); // Subject to manage the lifecycle of the component
  formData: any = null; // Property to hold the blog post data

  syncScrollEnabled = false; // Flag to control scroll synchronization
  categories: Category[]; // Replace with actual categories
  preSelectedCategories: string[] = []; // Pre-selected categories for the blog post
  
  @ViewChild('contentTextarea') contentTextarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('markdownPreview') markdownPreview!: ElementRef<HTMLDivElement>;


  constructor(private route: ActivatedRoute, private blogPostService: BlogpostService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    // this.blogPostId = this.route.snapshot.paramMap.get('id') || ''; // Get the blog post ID from the route parameters
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.blogPostId = params.get('id'); // Get the blog post ID from the route parameters
      this.loadBlogPost(this.blogPostId); // Load the blog post details
    });
  }
  
  ngOnDestroy() {
    this.destroy$.unsubscribe(); // Unsubscribe from the Subject to prevent memory leaks
  }

  loadBlogPost(id: string | null) {
    if (id) {
      this.blogPostService.getBlogPostById(id).subscribe({
        next: (data) => {
          console.log('Blog post data:', data); // Log the blog post data
          this.formData = data; // Assign the data to the blogPost property
          for(let category of this.formData.categories) {
            this.preSelectedCategories.push(category.id); // Push the category IDs to the preSelectedCategories array
          }
        },
        error: (error) => {
          console.error('Error fetching blog post:', error); // Log any errors
        }
      });
    } else {
      console.error('Blog post ID is null or undefined'); // Log an error if the ID is null or undefined
    }
  }

  onSubmit(form: NgForm){
    console.log('submitted form:', form.value); // Log the submitted form data
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
    console.log('Selected categories:', this.formData.categories);
  }

  

}
