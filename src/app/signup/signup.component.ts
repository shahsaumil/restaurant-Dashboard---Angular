import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup
  constructor(private formbuilder: FormBuilder, private _http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      password: [''],
    })
  }

  signUp() {
    this._http.post<any>('http://localhost:3000/signup', this.signupForm.value).subscribe(res => {
      alert('Signup Done');
      this.signupForm.reset();
      this.router.navigate(['login'])
    }, err => { alert('signup error'); }
    )
  }

}
