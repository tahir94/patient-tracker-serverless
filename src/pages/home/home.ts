import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PatientFormPage } from "../patient-form/patient-form";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
add(){
this.navCtrl.push(PatientFormPage)
}

}
