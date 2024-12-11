import { Component } from '@angular/core';
import { OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from './models/category.model';
import { CategoryService } from './services/category.service';


@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.css'
})
export class ServicePageComponent implements OnInit {

  categories: Category[] = [];


  categoryForm!: FormGroup;

  constructor(private fb : FormBuilder,public service: CategoryService ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryId: [null],
      categoryName: ['', Validators.required],
      description: ['', Validators.required]

    });

    this.service.getCategories().subscribe(res => {
      debugger;
      this.categories = res;
  });
}
  loadCategories(){


}

}