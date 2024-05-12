import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl } from '@angular/forms';
import { DataService } from '../../service/data.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  registerusers !: FormGroup;

  constructor(private router: Router, private formBuilder : FormBuilder, private http : HttpClient, private dataservice: DataService) {

  }
  ngOnInit(): void {
    this.registerusers = this.formBuilder.group({
      photo: ['',Validators.required] ,
      firstName:['',Validators.required, this.firstNameValidator()],
      lastName: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      mobile:['',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      age:['',Validators.required],
      address: ['' ,Validators.required],
      state: ['',Validators.required],
      country:['',Validators.required],
      tag: ['',[Validators.required, this.tagsValidator]],
      subscribe: [true , Validators.required]
    })
  }

  

  postData(){
    this.http.post<any>("http://localhost:3000/users", this.registerusers.value)
    .subscribe(res => {
      alert("Registration success");
      this.registerusers.reset();
      this.router.navigate(['/profile']);
      
    },
    err=>{
      alert('Something is wrong')
    })
  }



  firstNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const firstName = control.value;
      const regex = /^[a-zA-Z]+$/; // Only alphabetic characters
      const maxLength = 20;

      if (firstName && !regex.test(firstName)) {
        return { invalidFirstName: true }; // Validation failed
      }

      if (firstName && firstName.length > maxLength) {
        return { maxLengthExceeded: true }; // Validation failed
      }

      return null; // Validation passed
    };
  }
  
  search() {
    this.router.navigate(['https://www.google.com'])
  }

  addressType: string = ''; // Initialize address type
  showHomeFields: boolean = false;
  showCompanyFields: boolean = false;

  showFields() {
    const address = this.registerusers.get('address')?.value;
    this.showHomeFields = address === 'Home';
    this.showCompanyFields = address === 'Company';

    if (!this.showHomeFields) {
      this.registerusers.get('address1')?.reset();
      this.registerusers.get('address2')?.reset();
    }
    if (!this.showCompanyFields) {
      this.registerusers.get('companyAddress1')?.reset();
      this.registerusers.get('companyAddress2')?.reset();
    }
  }

  [x: string]: any;
  errorMessage: string | null = null;
  selectedFile: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;
  interests: any;
  

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file) {
        this.selectedFile = file;
        if (event.target.files && event.target.files[0]) {
          if (event.target.files[0].size < 310 * 313) {
            this.previewImage();
            this.errorMessage = null;
          }
          else {
            this.errorMessage = 'Image dimensions Lies between 310x325 pixels.';
            this.imageSrc = null;
          }
        } 
      }
    }
    
  }
      
  previewImage() {
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile as Blob);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
      
    };
  }

  age: number = 20;
  
  updateAge(value: string) {
    this.age = parseInt(value, 10);
  }

  keywords = ['cricket','football','hockey'] ;
  formControl = new FormControl(['angular']);

  announcer = inject(LiveAnnouncer);

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  tagsValidator(control: AbstractControl) {
    const tags = control.value;
    if (!tags || !tags.length) {
      return { 'required': true };
    }
    return null;
  }

  save(){
    this.router.navigateByUrl('/profile');
  }

}

