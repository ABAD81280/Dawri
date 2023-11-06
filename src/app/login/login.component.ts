import { Component } from '@angular/core';
import {AllService} from "../serves/all.service"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private serv:AllService){}
  email!:string
  pas!:string
  Login()
  {
    this.serv.Login(this.email,this.pas)
  }

}
