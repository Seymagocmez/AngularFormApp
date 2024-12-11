import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormPageComponent } from './form-page/form-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicePageComponent } from './service-page/service-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FormPageComponent,
    ServicePageComponent // Add the FormPageComponent to the declarations array
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
  //if you want to look at another port etc. 
  //do: ng serve --port 4200 so that you can see the app on port 4200 
  //if you want to look at another port etc. you should do ng serve --port #### etc. 
})
export class AppModule { }
