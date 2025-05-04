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
  categoryCount = 0;
  pageNumber = 1;
  pageSize = 6;
  list: number[] = [];
  queryText?: string | undefined = undefined;
  columnName?: string | undefined = undefined;
  constructor(private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.categoryService.GetCategoryCount().subscribe({
      next: (response) => {
        this.categoryCount = response;
        this.list = new Array(Math.ceil(response / this.pageSize));

        this.categories$ = this.categoryService.getAllCategories(
          undefined,
          undefined,
          undefined,
          this.pageNumber,
          this.pageSize
        );

      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  searchCategory(query: string) {
    this.queryText = query;
    this.categories$ = this.categoryService.getAllCategories(query,undefined, undefined, this.pageNumber, this.pageSize);
  }

  sort(column: string, sortOrder: string) {
    this.columnName = column;
    this.categories$ = this.categoryService.getAllCategories(undefined, column, sortOrder, this.pageNumber, this.pageSize);
  }

  goToPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.categories$ = this.categoryService.getAllCategories(this.queryText, this.columnName, this.sortOrder, this.pageNumber, this.pageSize);
  }
}
