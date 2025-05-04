import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/model/Category';
import { Observable } from 'rxjs';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories$?: Observable<Category[]>;
  sortOrder = '';
  constructor(private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.categories$ = this.categoryService.getAllCategories();
  }

  searchCategory(query: string) {
    this.categories$ = this.categoryService.getAllCategories(query);
  }

  sort(column: string, sortOrder: string) {
    this.categories$ = this.categoryService.getAllCategories(undefined, column, sortOrder);
  }
}
