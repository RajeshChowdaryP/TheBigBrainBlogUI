import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddCategory } from 'src/app/model/AddCategoryRequest';
import { CategoryService } from '../../services/category.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  formData: AddCategory = {
    'name': '',
    'urlHandle': ''
  };
  destory$: any = new Subject<any>();
  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
  }

  // onBlur(controlName: string): void {
  //   const control = this.AddCategory.get(controlName);
  //   if (control) {
  //     console.log(control.value);
  //   }
  // }

  OnSubmit(form: NgForm): void {
    if(form.valid){
      this.categoryService.addCategory(this.formData).pipe(takeUntil(this.destory$)).subscribe({
        next: val => {
          this.router.navigateByUrl('/Admin/Categories');
        },
        error: er => {
          console.error(er);
        }
      });
    }
  }
  
  ngOnDestroy(){
    this.destory$.unsubcribe;
  }
}