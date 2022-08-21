import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ApiService } from '../services/api.service';
import { RestData } from './rest.model';

declare var window: any;

@Component({
  selector: 'app-rest-dash',
  templateUrl: './rest-dash.component.html',
  styleUrls: ['./rest-dash.component.css']
})
export class RestDashComponent implements OnInit {

  formModel: any;
  formValue!: FormGroup
  restmodelobject: RestData = new RestData;
  allresdata: any;
  showAdd!: boolean;
  showedit!:boolean;   
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.getallres()
    this.formModel = new window.bootstrap.Modal(document.getElementById("exampleModal"),
      this.formValue = this.formBuilder.group({
        name: [''],
        email: [''],
        mobile: [''],
        address: [''],
        services: ['']

      })
    );

  }

  openModal() {
    this.formModel.show();
  }



  //subscribve data which maped by service
  addRes() {
    this.restmodelobject.name = this.formValue.value.name;
    this.restmodelobject.email = this.formValue.value.email;
    this.restmodelobject.mobile = this.formValue.value.mobile;
    this.restmodelobject.address = this.formValue.value.address;
    this.restmodelobject.services = this.formValue.value.services;

    this.api.postRest(this.restmodelobject).subscribe(res => {
      console.log(res);
      alert("Res Data added");
      this.formValue.reset();
      this.getallres();
    },
      err => { alert("Not working") }
    )
  }

  //get all data
  getallres() {
    this.api.getRest().subscribe(res => {
      this.allresdata = res;
    })
  }

  //delete res
  deleteres(data: any) {
    this.api.delRes(data.id).subscribe(res => { alert('Deleted Data') })
    this.getallres();
  }

  editbtn(data: any) {
    this.formModel.show();
    this.restmodelobject.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updatebtn() {
    this.restmodelobject.name = this.formValue.value.name;
    this.restmodelobject.email = this.formValue.value.email;
    this.restmodelobject.mobile = this.formValue.value.mobile;
    this.restmodelobject.address = this.formValue.value.address;
    this.restmodelobject.services = this.formValue.value.services;

    this.api.updateRes(this.restmodelobject, this.restmodelobject.id).subscribe(res => { alert('Update Details');
   this.formValue.reset()
   this.getallres();

  })
  }
}


