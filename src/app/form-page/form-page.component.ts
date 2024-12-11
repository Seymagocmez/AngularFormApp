import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

// form page basically is a form that you can fill out and submit 

//reactive form: it has form builder, form group, form control, and form array

//builder: it is a service that provides convenient methods for creating instances of FormControl, FormGroup, and FormArray
//group: it is a class that tracks the value and validity state of a group of FormControl instances
//control: it is a class that tracks
//array: it is a class that tracks the value and validity state of an array of FormControl, FormGroup, or FormArray instances


//this is main logic, we are creating a form group with name and email as form controls and phones as form array
      //we even can use apis to validate the form. 
      //form validation: it is a process of ensuring that user input is clean, correct, and useful.
@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.css'
})
export class FormPageComponent implements OnInit {

  myForm!: FormGroup;
// form group: it is a class that tracks the value and validity state of a group of FormControl instances
//it is important because it helps us to track the value and validity state of a group of FormControl instances
  savedForms: any[] = [];

  editingIndex: number  | null = null;
//here we are using any type because we are not sure about the type of the data that we are going to store in the savedForms array

  //undefined any types are actually not a good practice, but we are using it here to show the concept of reactive forms. 
  constructor(private fb: FormBuilder  ) { }

  ngOnInit(): void {
   
    this.myForm = this.fb.group({
      name: ['', Validators.required, Validators.minLength(32)],
      
      email: [{value: '', disabled: true}, [Validators.required]],
      phones: this.fb.array([
        this.fb.control('')
        //array de dinamik bir şekilde telefon numarası eklemek istediğimiz için bu şekilde tanımladık
        //bu array olarak verildi çünkü birden fazla telefon numarası olabilir
        // ve bu numaralar daha sonra silinebilir veya eklenebilir
      ]),
      phones2: this.fb.group([
        //group sabit bir sayıda telefon numarası olacağını varsayar, sabitse bu kullanılabilir
        //burada grup çünkü api den gelen verileri grup olarak almak istiyoruz
        this.fb.control('')
      ])
    });
this.loadForms();

  }
  getControl(controlName: string){
    return this.myForm.get(controlName);
  }

  get phones(): FormArray {
    return this.myForm.get('phones') as FormArray;
    //abbstract control: it is a class that all form controls extend.
    // It provides a common set of properties and methods for working with form controls.
  }
addPhone(){
this.phones.push(this.fb.control(''));
}
removePhone(index: number):void{
  this.phones.removeAt(index);
}

save() {


console.log(this.myForm.value);//sadece etkin kontrol değerlerini döndürür

console.log(this.myForm.getRawValue());//tüm kontrol değerlerini döndürür
  debugger;
  if(this.myForm.valid){
    const formValue = this.myForm.value;

if (this.editingIndex !== null) {
  this.savedForms[this.editingIndex] = formValue;
  this.editingIndex = null;
}else{
 this.savedForms.push(formValue); 
}
    
    //eğer form valid ise form value yu saved forms a pushla 
const savedForms = JSON.parse(localStorage.getItem("forms") || '[]');
savedForms.push(formValue);
localStorage.setItem("forms", JSON.stringify(savedForms));

    this.myForm.reset();
//formu sıfırla çünkü formu kaydettik ve yeni bir form oluşturmak istiyoruz
this.loadForms();
//formu yükle 

while(this.phones.length > 1){
  this.phones.removeAt(1);
    }
  }}
  loadForms(){
    const saved = localStorage.getItem("forms");
    // local storage a kaydettik çünkü bu formu daha sonra düzenlemek isteyebiliriz
    if(saved){
      this.savedForms = JSON.parse(saved);
      // json parse ile stringi objeye çevir çünkü local storage string olarak tutar
    }
    }
    edit(index: number): void {
      const form = this.savedForms[index];
      this.myForm.patchValue(form);
      //patch formu düzenlemek için kullanılır
      this.editingIndex = index;
      //index i düzenleme indexine ata
      //bu indexi daha sonra kullanarak formu düzenleyebiliriz

      this.phones.clear();
    form.phones.forEach((phone: string) => {
      this.phones.push(this.fb.control(phone));
      //in each phone number, push the phone number to the form array
      //her telefon numarasında, telefon numarasını form dizisine ekleyin
    });


}
delete(index: number): void {

  //splice: it is a method that adds/removes items to/from an array, and returns the removed item(s).
  //splice metodu bir diziyi değiştirir ve değiştirilen öğeleri döndürür

  this.savedForms.splice(index, 1);
  localStorage.setItem("forms", JSON.stringify(this.savedForms));
  this.loadForms();
  //last line is used to load the forms again after deleting the form
  
  //splice: it is a method that adds/removes items to/from an array, and returns the removed item(s).
  //splice metodu bir diziyi değiştirir ve değiştirilen öğeleri döndürür
}
}