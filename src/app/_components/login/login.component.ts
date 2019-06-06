import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Login} from "../../_interfaces/login";
import {AuthenticationService} from "../../_services";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  loguinError:string = "";
  error:string = "";
  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthenticationService,
      private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    });
  }

  isEmail(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return {noEmail: true};
    }
  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    let user: Login = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
      perfil:environment.PERFIL
    };
    this.login(user);
  }

  resetForm() {
    this.loginForm.reset();
    this.submitted = false;

  }

  login(user:Login){
    this.authService.login(user)
        .then(result => {
          this.loguinError = result;
          this.loading = false;
          this.resetForm();
        },
        error =>
        {
          this.loading = false;
        })
  }

}
