import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Category } from "../models/category.model";

@Injectable({
  providedIn: 'root' 
})
export class CategoryService {

    apiUrl = environment.apiUrl;

    // to be able to make http requests, we need to inject the HttpClient service
//injecting means creating an instance of a class and using it in another class



  constructor(private http: HttpClient) { }
getCategories() : Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiUrl}Categories`).pipe(
        map((data:Category[]) => data.map((item => ({

            categoryId: item.categoryId,
            categoryName: item.categoryName,
            description: item.description
        }))))
    )
}
   

}
