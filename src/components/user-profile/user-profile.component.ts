import { Component,OnInit, inject } from '@angular/core';

import { DataService } from '../../service/data.service';

import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder, AbstractControl, FormControl} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
declare var $:any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

export class UserProfileComponent implements OnInit{

  users : any;

  registerUsers: any;
  
  constructor(private dataservice: DataService, private router: Router, private http: HttpClient, private formbuilder: FormBuilder){
    
    this.dataservice.getData().subscribe((data)=>{
      console.warn("data",data);
      this.users=data;
      
    })
    
    this.registerUsers = this.formbuilder.group({
      photo: ['',Validators.required] ,
      firstName:['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      mobile:['',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      age:['',Validators.required],
      address: ['' ,Validators.required],
      state: ['',Validators.required],
      country:['',Validators.required],
      tag: ['',[Validators.required, this.tagsValidator]],
      subscribe: [false , Validators.requiredTrue]
    }) 
  }

  ngOnInit(): void {
    
       
}
previewImage() {
  const reader = new FileReader();
  reader.readAsDataURL(this.selectedFile as Blob);
  reader.onload = () => {
    this.imageSrc = reader.result as string;
  };
}


  homenavigation(){
    this.router.navigate(['/home'])
  }

  submitForm(){
    
    console.log(this.registerUsers.value);
    this.dataservice.getdata(this.registerUsers.value).subscribe(data=>{

      alert("Updated");
      console.log(data);
      this.registerUsers.reset();
    })
  }

  // To update user profile 
  geteuserbyId(ID:any){
    this.dataservice.geteuserbyId(ID).subscribe(data=>{
      alert('sucsessfully get details !')
      console.log("user details" , data);

      this.registerUsers.patchValue({
      firstName:data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile:data.mobile,
      age:data.age,
      address: data.address,
      state: data.state,
      country:data.country,
      tag: data.tag,
      subscribe: data.subscribe
      })
    })
  }

  getphoto(ID:any){
    this.dataservice.geteuserbyId(ID).subscribe(data=>{
      alert('sucsessfully get image !')
      console.log("user photo" , data);
      this.registerUsers.patchValue({
      photo: data.photo
      })
    })
  }
 
  
  errorMessage: string | null = null;
  selectedFile: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;

  onFilechange(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    Validators.required;
    if (file) {
      if (file) {
        this.selectedFile = file;
        if (event.target.files && event.target.files[0]) {
          if (event.target.files[0].size < 310 * 313) {
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.imageSrc = reader.result as string;
              this.errorMessage = null;
            };
          }
          else {
            this.errorMessage = 'Image dimensions Lies between 310x325 pixels.';
            this.imageSrc = null;
          }
        }
      }
    }
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

  addressType: string = ''; // Initialize address type
  showHomeFields: boolean = false;
  showCompanyFields: boolean = false;

  showFields() {
    const address = this.registerUsers.get('address')?.value;
    this.showHomeFields = address === 'Home';
    this.showCompanyFields = address === 'Company';

    if (!this.showHomeFields) {
      this.registerUsers.get('address1')?.reset();
      this.registerUsers.get('address2')?.reset();
    }
    if (!this.showCompanyFields) {
      this.registerUsers.get('companyAddress1')?.reset();
      this.registerUsers.get('companyAddress2')?.reset();
    }
  }

  save(){
    this.router.navigateByUrl('/profile');
  }

  uploadFile() {
    this.users.loadImage('user.image');
  }
}