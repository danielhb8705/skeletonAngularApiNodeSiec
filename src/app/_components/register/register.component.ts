import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as JWT from 'jwt-decode';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {AuthenticationService, UserService} from "../../_services";
import {Cliente} from "../../_interfaces/cliente";
import {User} from "../../_models";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private token;
  public cliente:Cliente;
  public loading = true;
  public total = 3;
  registerForm: FormGroup;
  closeResult: string;
  submitted = false;
  notsame:boolean = false;
  error:boolean = false;
  response_error:string = "";
  success:boolean = false;


  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private authService:AuthenticationService,
              private router: Router) {

  }

  getCliente(id){
    this.userService.getCliente(id)
        .then(data => {
          if(data.response)
          {
            this.cliente = data.result;
            this.loading = false;
          }
          else
          {
            this.cliente = null;
            this.loading = false;
            this.error = true;
          }
        },
          error => {
              this.error = true;
              this.loading = false;

          }

        );
  }

  ngOnInit() {
      this.logout(false);
    //cargando los datos iniciales
    try {
      this.token = JWT(this.route.snapshot.paramMap.get("token"));
      if(this.token.iss == environment.resourceToken)
      {
          if(this.token.data.ID_CLIENTE!=null && this.token.data.ID_CLIENTE!="")
          {
              this.getCliente(this.token.data.ID_CLIENTE);
          }
          else{
              this.error = true;
          }
      }
      else
      {
          this.error = true;
      }


    }catch (e) {
        this.error = true;
    }

    this.registerForm = this.formBuilder.group({
      usuario: ['', [Validators.required,Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPass: ['',Validators.required],
      nombre: ['', [Validators.required,Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
    },{validator: this.checkPasswords });

  }
     checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPass.value;

    return pass === confirmPass ? null : group.controls['confirmPass'].setErrors({ notsame: true });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    let user:User;
    user.ID = this.cliente.ID;
    user.USUARIO = this.registerForm.controls.usuario.value;
    user.NOMBRE = this.registerForm.controls.nombre.value;
    user.EMAIL = this.registerForm.controls.email.value;
    user.PASSWORD = this.registerForm.controls.password.value;

  }

  resetForm() {
    this.registerForm.reset();
    this.submitted = false;
    this.response_error = "";

  }

  insert(object:User){
    this.userService.insert(object,true)
        .then(response => {
              if(response.response)
              {
                  this.getCliente(this.cliente.ID);
                  this.loading = false;
                  this.resetForm();
                  this.success = true;
              }
              else
              {
                  this.response_error = response.message;
                  this.loading = false;
              }

            },
            error => {
                this.response_error = error.message;
                this.loading = false;
                this.resetForm();

            }
        );
  }
    logout(flag) {
        if(flag)
        {
            this.router.navigate(['/login']);
        }

        this.authService.logout();
    }

}
