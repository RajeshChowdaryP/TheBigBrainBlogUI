import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  categoryId: string;
  category: Category;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router){

  }

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      this.categoryId = params.get('id');
      this.categoryService.getSelectedCategory(this.categoryId).subscribe({
        next: (response) => {
          this.category = response;
        },
        error: er => {
          console.log(er);
        }
      });
    });
  }

  UpdateCategory(form){
    this.categoryService.updateSelectedCategoryValues(this.category.id,this.category).subscribe({
      next: response => {
        console.log(response);
        this.router.navigateByUrl('/Admin/Categories')
      },
      error: er => {
        console.log(er);
      }
    });
  }

  DeleteRecord(category){
    this.categoryService.deleteCategory(category.id).subscribe({
      next: response => {
        console.log(response);
        this.router.navigateByUrl('/Admin/Categories')
      },
      error: er => {
        console.log(er);
      }
    })
  }

}
