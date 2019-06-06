import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService, UserService} from "../../_services";
import {User} from "../../_models";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public currentUser:User;
  nombreForm: FormGroup;
  emailForm: FormGroup;
  passForm: FormGroup;
  loading = false;
  submitted = false;
  showN:boolean = false;
  showE:boolean = false;
  showP:boolean = false;
  loadingN:boolean = false;
  loadingE:boolean = false;
  loadingP:boolean = false;
  class_alert:string = "alert alert-success";
  message:string = "";
  nombre_error:string = "";

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private authService: AuthenticationService) {
    //this.loadCurrentSession();
  }

  ngOnInit() {

    this.nombreForm = this.formBuilder.group({
      nombre: [this.currentUser.NOMBRE, [Validators.required,Validators.minLength(4)]],
    });

    this.emailForm = this.formBuilder.group({
      email: [this.currentUser.EMAIL, [Validators.required, Validators.email]],
    });

    this.passForm = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(4)]],
      confirmPass: ["",Validators.required],
    },{validator: this.checkPasswords });

  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPass.value;
    return pass === confirmPass ? null : group.controls['confirmPass'].setErrors({ notsame: true });
  }
  get n() { return this.nombreForm.controls; }
  get e() { return this.emailForm.controls; }
  get p() { return this.passForm.controls; }

  onSubmit(letra) {
    this.submitted = true;
    // stop here if form is invalid
    if(letra=='e'){
      if(this.emailForm.invalid) {
        return;
      }
      this.loadingE = true;
    }
    if (letra=='n' ){
      if( this.nombreForm.invalid) {
        return;
      }
      this.loadingN = true;
    }

    let user:User = new User();
    user.ID_CLIENTE = this.currentUser.ID_CLIENTE;
    user.USUARIO = this.currentUser.USUARIO;
    user.NOMBRE = this.nombreForm.controls.nombre.value;
    user.EMAIL = this.emailForm.controls.email.value;
    user.PASSWORD = this.passForm.controls.password.value;
    user.ID = this.currentUser.ID;
    user.IS_ADMIN = this.currentUser.IS_ADMIN;
    this.update(user,letra);

  }

  onSubmitPass() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.passForm.invalid) {
      return;
    }
    this.loadingP = true;
    let user:User= new User();
     user.ID_CLIENTE = this.currentUser.ID_CLIENTE;
     user.USUARIO = this.currentUser.USUARIO;
     user.NOMBRE = this.nombreForm.controls.nombre.value;
     user.EMAIL = this.emailForm.controls.email.value;
     user.PASSWORD = this.passForm.controls.password.value;
     user.ID = this.currentUser.ID;
     user.IS_ADMIN = this.currentUser.IS_ADMIN;
    this.update(user,"p");

  }

  toggleN()  {if(this.showN){this.showN = false;}else{this.showN = true}}
  toggleE()  {if(this.showE){this.showE = false;}else{this.showE = true}}
  toggleP()  {if(this.showP){this.showP = false;}else{this.showP = true}}

  update(object:User,letra){
    this.userService.update(object)
      .then(response => {
          switch(letra)
          {
            case 'e':  this.toggleE(); this.loadingE = false;  break;
            case 'n':  this.toggleN(); this.loadingN = false;  break;
            case 'p':  this.toggleP(); this.loadingP = false;  break;
          }
          this.getUser(this.currentUser.ID);
        },
        error => {
          switch(letra)
          {
            case 'e':  this.toggleE(); this.loadingE = false;  break;
            case 'n':  this.toggleN(); this.loadingN = false;   break;
            case 'p':  this.toggleP(); this.loadingP = false;  break;
          }

        }


      );
  }
  resetForms(user)
  {
    this.nombreForm.controls.nombre.reset(user.NOMBRE);
    this.emailForm.controls.email.reset(user.EMAIL);
    this.passForm.controls.password.reset();
    this.passForm.controls.confirmPass.reset();
    this.submitted = false;
  }
  getUser(id){
    this.userService.getById(id)
      .then(data => {
          if(data!=null)
          {
            if(data.result!=null)
            {
              let user:User = data.result;
              user.token = this.currentUser.token;
              this.setCurrentSession(user);
              this.resetForms(user);
            }
          }
        },
        error => {

        }
      );
  }
  setCurrentSession(user){
    this.authService.setCurrentSession(user);
    this.loadCurrentSession();


  }
  loadCurrentSession(){
    this.currentUser = this.authService.getCurrentSession();
    console.log(this.currentUser);
  }
  onmessage(onclass,onmessage)
  {
    if(onclass)
    {
      this.class_alert = "align-top "+onclass;
    }

    this.message = onmessage;
  }

}
