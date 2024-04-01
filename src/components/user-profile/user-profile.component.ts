import { Component,OnInit } from '@angular/core';

import { DataService } from '../../service/data.service';
import { reduce } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})

export class UserProfileComponent{

  users : any;
  
  constructor(private dataservice: DataService, private router: Router){
    
    this.dataservice.getData().subscribe((data)=>{
      console.warn("data",data);
      this.users=data
      
    })

    
    
  }

  homenavigation(){
    this.router.navigate(['/home'])
  }

}