import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, CheckboxControlValueAccessor} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService, UserService,DatoscoiService} from "../../_services";
import {Fechamesanhio} from "../../_interfaces/fechamesanhio";
import {Balanzadptocoi} from "../../_interfaces/balanzadptocoi";

/* A PARTIR DE AQUI EL DATEPICKER] */
import * as _moment from 'moment';
import {default as _rollupMoment,Moment} from 'moment';
import { diPublicInInjector } from '@angular/core/src/render3/di';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { Promise } from 'q';
import { MatTableDataSource, MAT_TABS_CONFIG } from '@angular/material';
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


@Component({
  selector: 'app-balanzaxdpto',
  templateUrl: './balanzaxdpto.component.html',
  styleUrls: ['./balanzaxdpto.component.scss'],
  providers: [
    {provide: DateAdapter,useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class BalanzaxdptoComponent implements OnInit {


  dataSource : Balanzadptocoi[];
  date = new FormControl(moment());
  displayedColumns: string[] =['NUMCUENTA','NAMECUENTA','NAMEDPTO','SALDOINICIAL','TOTALCARGOS','SALDOFINAL'];
  constructor(private userService: UserService,
    // private formControl: FormControl,
     private authService: AuthenticationService,
     private datosCoi: DatoscoiService ) { }

  ngOnInit() {
 

   console.log(this.date.value.month()+" "+this.date.value.year());
   let fecha_mes_ano : Fechamesanhio ={
     month: this.date.value.month(),
     anhio: this.date.value.year()
   }
   this.datosCoi.getBalanzaXDpto_MesAnhio(fecha_mes_ano).then(result=>{
     console.log(result);
      this.dataSource =  result.map(balanza =>{
        return {
           NUMCUENTA: balanza.NUMCUENTA,
           NAMECUENTA: balanza.NAMECUENTA,
           NAMEDPTO: balanza.NAMEDPTO,
           SALDOINICIAL: balanza.SALDOINICIAL,
           TOTALCARGOS: balanza.TOTALCARGOS,
           TOTALABONOS: balanza.TOTALABONOS,
           SALDOFINAL: balanza.SALDOFINAL
        } as Balanzadptocoi;
        
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
      
        
        this.datosCoi.getBalanzaXDpto_MesAnhio(fecha_mes_ano).then(result=>{
          console.log(result);
           this.dataSource = result.map(balanza =>{
             return {
                NUMCUENTA: balanza.NUMCUENTA,
                NAMECUENTA: balanza.NAMECUENTA,
                NAMEDPTO: balanza.NAMEDPTO,
                SALDOINICIAL: balanza.SALDOINICIAL,
                TOTALCARGOS: balanza.TOTALCARGOS,
                TOTALABONOS: balanza.TOTALABONOS,
                SALDOFINAL: balanza.SALDOFINAL
             } as Balanzadptocoi;
             
           });
         });
       
      }
     /*FUNCION PARA FILTRAR */ 
      applyFilter(filterValue: string){
      //  this.dataSource.filter= filterValue.trim().toLowerCase();
        
      }
}
