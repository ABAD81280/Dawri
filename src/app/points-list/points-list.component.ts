import { Component } from '@angular/core';
import {AllService} from "../serves/all.service"
import { from,Observable, window } from 'rxjs';
@Component({
  selector: 'app-points-list',
  templateUrl: './points-list.component.html',
  styleUrls: ['./points-list.component.css']
})
export class PointsListComponent {
  constructor(private serv:AllService){this.getALL()}
  AllP!:Observable<any>
  g:string = String( sessionStorage.getItem("g"))
  e:string = String(sessionStorage.getItem("e"))
  gg!:string
  getALL()
  {
    const all = from(this.serv.getAll(this.g))
    this.AllP = all
    console.log("ok")
  }
  plusPoints(email:string,name:string)
  {
    this.serv.plusPoints(email,name)
  }
  minusPoints(email:string,name:string)
  {
    this.serv.minusPoints(email,name)
  }
  zeroPoints()
  {
    this.serv.zeroPoints(this.g)
  }
  updateGroupName()
  {
    this.serv.updateGroupName(this.e,this.gg)
  }

}
