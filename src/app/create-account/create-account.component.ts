import { Component } from '@angular/core';
import { AllService } from "../serves/all.service"
import { Router } from "@angular/router"
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
constructor(private server:AllService,public router:Router){}
groupName!:string
name!:string
pas!:string
email!:string
pasC!:string


  AddAccount()
  {
    if(this.pas==this.pasC)
    {
      this.server.addAccount(this.name,this.email,this.groupName,this.pas)
    }
    else
    {
      alert("كلمه المرور غير متطابقه")
    }
  }
  goToAddGroup()
  {
    this.router.navigate(["/addgroup"])
  }
  goToLogin()
  {
    this.router.navigate(["/Login"])
  }
}
