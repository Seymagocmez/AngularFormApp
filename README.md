# Angular Form & API Service

This project is an Angular-based application designed to handle category forms and manage categories. It features form validation, integration with a backend service, and a clean user interface.

## Features

- Dynamic form creation using Angular Reactive Forms
- Form validation for user inputs
- Category management (add, view, edit, delete)
- Integration with a backend API for data retrieval and updates
- Modular structure for scalability and maintainability

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your computer
- Angular CLI installed globally (`npm install -g @angular/cli`)
- A running backend API for category data (optional, depending on the project setup)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Seymagocmez/AngularFormApp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd AngularFormApp
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the development server:

   ```bash
   ng serve
   ```

2. Open your browser and navigate to:

   ```
   http://localhost:4200
   ```

3. Use the application to manage categories by filling out forms and interacting with the UI.

## Creating a Form in Angular

### Using Reactive Forms

Angular's Reactive Forms module provides a flexible and scalable way to build forms.

1. **Import ReactiveFormsModule**:
   Ensure `ReactiveFormsModule` is imported in your `AppModule`:

   ```typescript
   import { ReactiveFormsModule } from '@angular/forms';
   
   @NgModule({
     declarations: [
       AppComponent,
     ],
     imports: [
       BrowserModule,
       ReactiveFormsModule,
     ],
     bootstrap: [AppComponent]
   })
   export class AppModule { }
   ```

2. **Define the Form Group**:
   In your component, create a `FormGroup`:

   ```typescript
   import { Component, OnInit } from '@angular/core';
   import { FormBuilder, FormGroup, Validators } from '@angular/forms';

   @Component({
     selector: 'app-service-page',
     templateUrl: './service-page.component.html',
   })
   export class ServicePageComponent implements OnInit {
     categoryForm: FormGroup;

     constructor(private fb: FormBuilder) {}

     ngOnInit(): void {
       this.categoryForm = this.fb.group({
         categoryId: [null],
         categoryName: ['', Validators.required],
         description: ['', Validators.required]
       });
     }

     onSubmit(): void {
       console.log(this.categoryForm.value);
     }
   }
   ```

3. **Bind the Form to the Template**:
   Use Angular's template syntax to connect your form:

   ```html
   <form [formGroup]="categoryForm" (ngSubmit)="onSubmit()">
     <label for="categoryId">Category ID:</label>
     <input id="categoryId" formControlName="categoryId">

     <label for="categoryName">Category Name:</label>
     <input id="categoryName" formControlName="categoryName">

     <label for="description">Description:</label>
     <textarea id="description" formControlName="description"></textarea>

     <button type="submit">Submit</button>
   </form>
   ```

## Using Services and APIs in Angular

### Setting Up a Service

Angular services facilitate communication with backend APIs. Here's how to set one up:

1. **Generate a Service**:
   Run the Angular CLI command:
   ```bash
   ng generate service services/category
   ```

2. **Define the Service Logic**:
   Implement methods to interact with the backend:

   ```typescript
   import { Injectable } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { Observable } from 'rxjs';
   import { Category } from '../models/category.model';

   @Injectable({ providedIn: 'root' })
   export class CategoryService {
     private apiUrl = 'https://example.com/api/categories';

     constructor(private http: HttpClient) {}

     getCategories(): Observable<Category[]> {
       return this.http.get<Category[]>(this.apiUrl);
     }

     addCategory(category: Category): Observable<Category> {
       return this.http.post<Category>(this.apiUrl, category);
     }
   }
   ```

3. **Use the Service in a Component**:
   Inject the service and call its methods:

   ```typescript
   import { Component, OnInit } from '@angular/core';
   import { CategoryService } from './services/category.service';
   import { Category } from './models/category.model';

   @Component({
     selector: 'app-service-page',
     templateUrl: './service-page.component.html',
   })
   export class ServicePageComponent implements OnInit {
     categories: Category[] = [];

     constructor(private categoryService: CategoryService) {}

     ngOnInit(): void {
       this.categoryService.getCategories().subscribe(data => {
         this.categories = data;
       });
     }
   }
   ```

## About Angular and Modularity

Angular is a TypeScript-based front-end framework designed for building dynamic web applications. One of its core principles is modularity:

- **Separation of Concerns**:
  Angular promotes organizing code into distinct modules for components, services, and routing. This ensures that each module has a single responsibility.

- **Reusability**:
  Modules, components, and services can be reused across different parts of the application or even across projects.

- **Lazy Loading**:
  Angular modules can be lazy-loaded to improve application performance by only loading the required modules when needed.

## Future Enhancements

- Add unit tests for components and services
- Implement additional CRUD operations for category management
- Improve error handling and user notifications

## License

This project is open-source and available under the [MIT License](LICENSE).

## Contact

If you have any questions or feedback, feel free to reach out:

- GitHub: [Seymagocmez](https://github.com/Seymagocmez)
