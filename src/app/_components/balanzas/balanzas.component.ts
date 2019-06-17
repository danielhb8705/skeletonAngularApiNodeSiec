import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, CheckboxControlValueAccessor} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService, UserService,DatoscoiService} from "../../_services";
import {Fechamesanhio} from "../../_interfaces/fechamesanhio";
import {Balanzacoi} from "../../_interfaces/balanzacoi";

/* A PARTIR DE AQUI EL DATEPICKER] */
import * as _moment from 'moment';
import {default as _rollupMoment,Moment} from 'moment';
import { diPublicInInjector } from '@angular/core/src/render3/di';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { Promise } from 'q';
import { MatTableDataSource } from '@angular/material';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput : 'MMM/YYYY',
  },
  display : {
    dateInput : 'MMM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    MonthYearA11Label: 'MMMM YYYY',
  },
}
/* A PARTIR DE AQUI LA TABLA */
/*export interface PeriodicElement {
  NUMCUENTA: String;
  NAMECUENTA: String;
  SALDOINICIAL: number;
  TOTALCARGOS: number;
  TOTALABONOS: number;
  SALDOFINAL: number;
  DEPTSINO: string;
  EJERCICIO: number;
}*//*
const ELEMENT_DATA : Balanzacoi[]=[
 {NUMCUENTA:'1' , NAMECUENTA:'Hydrogen',SALDOINICIAL: 100,TOTALCARGOS:0,TOTALABONOS:0,SALDOFINAL:1,DEPTSINO:'S',EJERCICIO:2019},
 {NUMCUENTA:'2' , NAMECUENTA:'Hydrogen',SALDOINICIAL: 100,TOTALCARGOS:0,TOTALABONOS:0,SALDOFINAL:1,DEPTSINO:'S',EJERCICIO:2019},
]*/

@Component({
  selector: 'app-balanzas',
  templateUrl: './balanzas.component.html',
  styleUrls: ['./balanzas.component.scss'],
  providers: [
    {provide: DateAdapter,useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class BalanzasComponent implements OnInit {
  //dataSource:Balanzacoi[];
  //dataSource ;
  dataSource : Balanzacoi[];
  date = new FormControl(moment());
  displayedColumns: string[] =['NUMCUENTA','NAMECUENTA','SALDOINICIAL','TOTALCARGOS','TOTALABONOS','SALDOFINAL'];
    
   
  constructor(private userService: UserService,
             // private formControl: FormControl,
              private authService: AuthenticationService,
              private datosCoi: DatoscoiService ){}
             
  ngOnInit() {
  //  let currentUser : User;
 //   currentUser= this.authService.getCurrentSession();

   console.log(this.date.value.month()+" "+this.date.value.year());
    let fecha_mes_ano : Fechamesanhio ={
      month: this.date.value.month(),
      anhio: this.date.value.year()
    }
    this.datosCoi.getBalanza_MesAnhio(fecha_mes_ano).then(result=>{
      console.log(result);
       this.dataSource = result.map(balanza =>{
         return {
            NUMCUENTA: balanza.NUMCUENTA,
            NAMECUENTA: balanza.NAMECUENTA,
            SALDOINICIAL: balanza.SALDOINICIAL,
            TOTALCARGOS: balanza.TOTALCARGOS,
            TOTALABONOS: balanza.TOTALABONOS,
            SALDOFINAL: balanza.SALDOFINAL
         } as Balanzacoi;
         
       });
     });
  }

  
  /*
      FUNCIONES
   */
  chosenYearHandler(normalizedYear: Moment){
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    
  }
  chosenMonthHandler(normalizedMonth:Moment, datepicker: MatDatepicker<Moment>){
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    let fecha_mes_ano : Fechamesanhio = {
      month: this.date.value.month(),
      anhio: this.date.value.year()
    }
      
        
        this.datosCoi.getBalanza_MesAnhio(fecha_mes_ano).then(result=>{
          console.log(result);
           this.dataSource = result.map(balanza =>{
             return {
                NUMCUENTA: balanza.NUMCUENTA,
                NAMECUENTA: balanza.NAMECUENTA,
                SALDOINICIAL: balanza.SALDOINICIAL,
                TOTALCARGOS: balanza.TOTALCARGOS,
                TOTALABONOS: balanza.TOTALABONOS,
                SALDOFINAL: balanza.SALDOFINAL
             } as Balanzacoi;
             
           });
         });
       
      }
}
