import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPageComponent } from './form-page/form-page.component';
import { ServicePageComponent } from './service-page/service-page.component';
//when you ctrl + . on the red line, it will automatically import the module for you. 

const routes: Routes = [
  {path: "forms", component: FormPageComponent },
  {path: "services", component: ServicePageComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
