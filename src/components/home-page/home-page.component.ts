import { Component, OnInit, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {

  registerusers !: FormGroup;

  constructor(private router: Router, private formBuilder : FormBuilder, private http : HttpClient) {

  }
  ngOnInit(): void {
    this.registerusers = this.formBuilder.group({
      photo: [''] ,
      firstName:[''],
      lastName: [''],
      email: [''],
      mobile:[''],
      age:[''],
      state: [''],
      country:[''],
      tag: ['']
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

  search() {
    this.router.navigate(['https://www.google.com'])
  }

  addressType: string = ''; // Initialize address type
  showHomeFields: boolean = false;
  showCompanyFields: boolean = false;

  showFields() {
    if (this.addressType === 'Home') {
      this.showHomeFields = true;
      this.showCompanyFields = false;
    } else if (this.addressType === 'Company') {
      this.showHomeFields = false;
      this.showCompanyFields = true;
    } else {
      this.showHomeFields = false;
      this.showCompanyFields = false;
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

  keywords = ['play',] ;
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

}

