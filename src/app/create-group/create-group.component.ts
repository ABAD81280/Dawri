import { Component } from '@angular/core';
import{AllService} from "../serves/all.service"
@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {
name!:string
constructor(private ser:AllService){}
addNewGr()
{
  this.ser.addNewGroup(this.name)
}
}
