import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, CheckboxControlValueAccessor} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService, UserService,DatoscoiService} from "../../_services";
import {Fechamesanhio} from "../../_interfaces/fechamesanhio";

/* A PARTIR DE AQUI EL DATEPICKER] */

import * as _moment from 'moment';
import {default as _rollupMoment,Moment} from 'moment';
import { diPublicInInjector } from '@angular/core/src/render3/di';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
//import { Promise } from 'q';
import { MatTableDataSource } from '@angular/material';
import { createNodeAtIndex } from '@angular/core/src/render3/instructions';
import { CanDeactivate } from '@angular/router/src/utils/preactivation';
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
  selector: 'app-er-x-cc-x-departamento',
  templateUrl: './er-x-cc-x-departamento.component.html',
  styleUrls: ['./er-x-cc-x-departamento.component.scss'],
  providers: [
    {provide: DateAdapter,useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ErXCcXDepartamentoComponent implements OnInit {

  dataTemporal : DatosTablaERXCCAnhio[];
  dataSource : DatosTablaERXCC[];
  dataSource1 : DatosTablaERXCC[];
  dataSource2 : DatosTablaERXCC[];
  departamentos: Depto[];
  selectedDepto:number=3;
  date = new FormControl(moment());
  displayedColumns: string[] =['NUMCUENTA','NAMECUENTA','REAL','PRESUP','REAL_ACUM','PRESUP_ACUM','PRESUP_ANHIO'];
   api1: boolean =false;
   api2: boolean =false;
  constructor(private userService: UserService,
     private authService: AuthenticationService,
     private datosCoi: DatoscoiService ) { 
      
     }

  ngOnInit() {
    //console.log(this.date.value.month()+" "+this.date.value.year());
   
   const p1= this.FuncionParaLlamarApi('getDatosVentasXDptoParaERXCC_MesAnhio');
   const p2 = this.FuncionParaLlamarApi('getDatosGastosGeneralesXDptoParaERXCC_MesAnhio');
   this.FuncionLlamarApiDepto();
   Promise.all([p1,p2]).then(values=>{
    // console.log(values);
     this.crearTablaResumen();
   });
    
  }

  /*
     FUNCIONES
   */
  ChangeSelect(){
   const p1 = this.FuncionParaLlamarApi('getDatosVentasXDptoParaERXCC_MesAnhio');
   const p2 = this.FuncionParaLlamarApi('getDatosGastosGeneralesXDptoParaERXCC_MesAnhio');
   Promise.all([p1,p2]).then(values=>{
    console.log(values);
    this.crearTablaResumen();
  });
  }
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
    const p1= this.FuncionParaLlamarApi('getDatosVentasXDptoParaERXCC_MesAnhio');
    const p2 = this.FuncionParaLlamarApi('getDatosGastosGeneralesXDptoParaERXCC_MesAnhio');
    Promise.all([p1,p2]).then(values=>{
      console.log(values);
      this.crearTablaResumen();
    });  
      }
  FuncionLlamarApiDepto(){
    this.datosCoi.getDepartamentos().then(result=>{
      console.log(result);
      this.departamentos = result.map(dep=>{
            return {
              DEPTO: dep.DEPTO,
              NOMBRE: dep.DESCRIP
            }
      });
      this.selectedDepto = 3;
    });
  }    
 async FuncionParaLlamarApi(api){
    let fecha_mes_ano : Fechamesanhio = {
      month: this.date.value.month(),
      anhio: this.date.value.year()
    }
    let dpto =this.selectedDepto;
    let variab = '';
    if(api == 'getDatosVentasXDptoParaERXCC_MesAnhio'){
       variab = 'dataSource';  
    }  
    if(api == 'getDatosGastosGeneralesXDptoParaERXCC_MesAnhio'){
      variab = 'dataSource1'; 
    }
        
   await this.datosCoi[api](fecha_mes_ano,dpto).then(result=>{
          console.log(result);
          this.dataTemporal = result.map(balanza =>{
            return {
              NUMCUENTA: balanza.NUMCUENTA,
              NAMECUENTA: balanza.NAMECUENTA,
              REAL_JAN: balanza.REAL_JAN,
              PRESUP_JAN: balanza.PRESUP_JAN,
              REAL_FEB: balanza.REAL_FEB,
              PRESUP_FEB: balanza.PRESUP_FEB,
              REAL_MAR: balanza.REAL_MAR,
              PRESUP_MAR: balanza.PRESUP_MAR,
              REAL_APR: balanza.REAL_APR,
              PRESUP_APR: balanza.PRESUP_APR,
              REAL_MAY: balanza.REAL_MAY,
              PRESUP_MAY: balanza.PRESUP_MAY,
              REAL_JUN: balanza.REAL_JUN,
              PRESUP_JUN: balanza.PRESUP_JUN,
              REAL_JUL: balanza.REAL_JUL,
              PRESUP_JUL: balanza.PRESUP_JUL,
              REAL_AUG: balanza.REAL_AUG,
              PRESUP_AUG: balanza.PRESUP_AUG,
              REAL_SEP: balanza.REAL_SEP,
              PRESUP_SEP: balanza.PRESUP_SEP,
              REAL_OCT: balanza.REAL_OCT,
              PRESUP_OCT: balanza.PRESUP_OCT,
              REAL_NOV: balanza.REAL_NOV,
              PRESUP_NOV: balanza.PRESUP_NOV,
              REAL_DEC: balanza.REAL_DEC,
              PRESUP_DEC: balanza.PRESUP_DEC,
              NATURALEZA: balanza.NATURALEZA,
              REAL_JAN_ACUM: balanza.REAL_JAN_ACUM,
              PRESUP_JAN_ACUM: balanza.PRESUP_JAN_ACUM,
              REAL_FEB_ACUM: balanza.REAL_FEB_ACUM,
              PRESUP_FEB_ACUM: balanza.PRESUP_FEB_ACUM,
              REAL_MAR_ACUM: balanza.REAL_MAR_ACUM,
              PRESUP_MAR_ACUM: balanza.PRESUP_MAR_ACUM,
              REAL_APR_ACUM: balanza.REAL_APR_ACUM,
              PRESUP_APR_ACUM: balanza.PRESUP_APR_ACUM,
              REAL_MAY_ACUM: balanza.REAL_MAY_ACUM,
              PRESUP_MAY_ACUM: balanza.PRESUP_MAY_ACUM,
              REAL_JUN_ACUM: balanza.REAL_JUN_ACUM,
              PRESUP_JUN_ACUM: balanza.PRESUP_JUN_ACUM,
              REAL_JUL_ACUM: balanza.REAL_JUL_ACUM,
              PRESUP_JUL_ACUM: balanza.PRESUP_JUL_ACUM,
              REAL_AUG_ACUM: balanza.REAL_AUG_ACUM,
              PRESUP_AUG_ACUM: balanza.PRESUP_AUG_ACUM,
              REAL_SEP_ACUM: balanza.REAL_SEP_ACUM,
              PRESUP_SEP_ACUM: balanza.PRESUP_SEP_ACUM,
              REAL_OCT_ACUM: balanza.REAL_OCT_ACUM,
              PRESUP_OCT_ACUM: balanza.PRESUP_OCT_ACUM,
              REAL_NOV_ACUM: balanza.REAL_NOV_ACUM,
              PRESUP_NOV_ACUM: balanza.PRESUP_NOV_ACUM,
              REAL_DEC_ACUM: balanza.REAL_DEC_ACUM,
              PRESUP_DEC_ACUM: balanza.PRESUP_DEC_ACUM,
              PRESUP_ANHIO: balanza.PRESUP_ANHIO
               
            } as DatosTablaERXCCAnhio;
            
          });
          
          this[variab] = this.dataTemporal.map(balanza =>{
              let cadena;
            switch(+this.date.value.month()){
              case 0:
                  cadena =  {
                    NUMCUENTA: balanza.NUMCUENTA,
                    NAMECUENTA: balanza.NAMECUENTA,
                    REAL: balanza.REAL_JAN,
                    PRESUP: balanza.PRESUP_JAN,
                    REAL_ACUM: balanza.REAL_JAN_ACUM,
                    PRESUP_ACUM: balanza.PRESUP_JAN_ACUM,
                    PRESUP_ANHIO: balanza.PRESUP_ANHIO,
                    NATURALEZA: balanza.NATURALEZA
                  
                  } as DatosTablaERXCC;
                  break;
              case 1:
                  cadena =  {
                    NUMCUENTA: balanza.NUMCUENTA,
                    NAMECUENTA: balanza.NAMECUENTA,
                    REAL: balanza.REAL_FEB,
                    PRESUP: balanza.PRESUP_FEB,
                    REAL_ACUM: balanza.REAL_FEB_ACUM,
                    PRESUP_ACUM: balanza.PRESUP_FEB_ACUM,
                    PRESUP_ANHIO: balanza.PRESUP_ANHIO,
                    NATURALEZA: balanza.NATURALEZA
                  
                  } as DatosTablaERXCC;
                  break; 
              case 2:
                  cadena =  {
                    NUMCUENTA: balanza.NUMCUENTA,
                    NAMECUENTA: balanza.NAMECUENTA,
                    REAL: balanza.REAL_MAR,
                    PRESUP: balanza.PRESUP_MAR,
                    REAL_ACUM: balanza.REAL_MAR_ACUM,
                    PRESUP_ACUM: balanza.PRESUP_MAR_ACUM,
                    PRESUP_ANHIO: balanza.PRESUP_ANHIO,
                    NATURALEZA: balanza.NATURALEZA
                  
                  } as DatosTablaERXCC;
                  break;
              case 3:
                  cadena =  {
                    NUMCUENTA: balanza.NUMCUENTA,
                    NAMECUENTA: balanza.NAMECUENTA,
                    REAL: balanza.REAL_APR,
                    PRESUP: balanza.PRESUP_APR,
                    REAL_ACUM: balanza.REAL_APR_ACUM,
                    PRESUP_ACUM: balanza.PRESUP_APR_ACUM,
                    PRESUP_ANHIO: balanza.PRESUP_ANHIO,
                    NATURALEZA: balanza.NATURALEZA
                  
                  } as DatosTablaERXCC;
                  break;
              case 4:
                  cadena =  {
                    NUMCUENTA: balanza.NUMCUENTA,
                    NAMECUENTA: balanza.NAMECUENTA,
                    REAL: balanza.REAL_MAY,
                    PRESUP: balanza.PRESUP_MAY,
                    REAL_ACUM: balanza.REAL_MAY_ACUM,
                    PRESUP_ACUM: balanza.PRESUP_MAY_ACUM,
                    PRESUP_ANHIO: balanza.PRESUP_ANHIO,
                    NATURALEZA: balanza.NATURALEZA
                  
                  } as DatosTablaERXCC;
                  break;                     
              case 5:
                  cadena =  {
                    NUMCUENTA: balanza.NUMCUENTA,
                    NAMECUENTA: balanza.NAMECUENTA,
                    REAL: balanza.REAL_JUN,
                    PRESUP: balanza.PRESUP_JUN,
                    REAL_ACUM: balanza.REAL_JUN_ACUM,
                    PRESUP_ACUM: balanza.PRESUP_JUN_ACUM,
                    PRESUP_ANHIO: balanza.PRESUP_ANHIO,
                    NATURALEZA: balanza.NATURALEZA
                  
                  } as DatosTablaERXCC;
                  break;
              case 6:
                  cadena =  {
                    NUMCUENTA: balanza.NUMCUENTA,
                    NAMECUENTA: balanza.NAMECUENTA,
                    REAL: balanza.REAL_JUL,
                    PRESUP: balanza.PRESUP_JUL,
                    REAL_ACUM: balanza.REAL_JUL_ACUM,
                    PRESUP_ACUM: balanza.PRESUP_JUL_ACUM,
                    PRESUP_ANHIO: balanza.PRESUP_ANHIO,
                    NATURALEZA: balanza.NATURALEZA
                  
                  } as DatosTablaERXCC;
                  break;      
               case 7:
                  cadena =  {
                    NUMCUENTA: balanza.NUMCUENTA,
                    NAMECUENTA: balanza.NAMECUENTA,
                    REAL: balanza.REAL_AUG,
                    PRESUP: balanza.PRESUP_AUG,
                    REAL_ACUM: balanza.REAL_AUG_ACUM,
                    PRESUP_ACUM: balanza.PRESUP_AUG_ACUM,
                    PRESUP_ANHIO: balanza.PRESUP_ANHIO,
                    NATURALEZA: balanza.NATURALEZA
                  
                  } as DatosTablaERXCC;
                  break;    
              case 8:
                  cadena =  {
                    NUMCUENTA: balanza.NUMCUENTA,
                    NAMECUENTA: balanza.NAMECUENTA,
                    REAL: balanza.REAL_SEP,
                    PRESUP: balanza.PRESUP_SEP,
                    REAL_ACUM: balanza.REAL_SEP_ACUM,
                    PRESUP_ACUM: balanza.PRESUP_SEP_ACUM,
                    PRESUP_ANHIO: balanza.PRESUP_ANHIO,
                    NATURALEZA: balanza.NATURALEZA
                  
                  } as DatosTablaERXCC;
                  break;       
              case 9:
                  cadena =  {
                    NUMCUENTA: balanza.NUMCUENTA,
                    NAMECUENTA: balanza.NAMECUENTA,
                    REAL: balanza.REAL_OCT,
                    PRESUP: balanza.PRESUP_OCT,
                    REAL_ACUM: balanza.REAL_OCT_ACUM,
                    PRESUP_ACUM: balanza.PRESUP_OCT_ACUM,
                    PRESUP_ANHIO: balanza.PRESUP_ANHIO,
                    NATURALEZA: balanza.NATURALEZA
                  
                  } as DatosTablaERXCC;
                  break;
                case 10:
                  cadena =  {
                    NUMCUENTA: balanza.NUMCUENTA,
                    NAMECUENTA: balanza.NAMECUENTA,
                    REAL: balanza.REAL_NOV,
                    PRESUP: balanza.PRESUP_NOV,
                    REAL_ACUM: balanza.REAL_NOV_ACUM,
                    PRESUP_ACUM: balanza.PRESUP_NOV_ACUM,
                    PRESUP_ANHIO: balanza.PRESUP_ANHIO,
                    NATURALEZA: balanza.NATURALEZA
                  
                  } as DatosTablaERXCC;
                  break; 
              case 11:
                  cadena =  {
                    NUMCUENTA: balanza.NUMCUENTA,
                    NAMECUENTA: balanza.NAMECUENTA,
                    REAL: balanza.REAL_DEC,
                    PRESUP: balanza.PRESUP_DEC,
                    REAL_ACUM: balanza.REAL_DEC_ACUM,
                    PRESUP_ACUM: balanza.PRESUP_DEC_ACUM,
                    PRESUP_ANHIO: balanza.PRESUP_ANHIO,
                    NATURALEZA: balanza.NATURALEZA
                  
                  } as DatosTablaERXCC;
                  break;             
            }
            return cadena ;
           
           
            
          });
         });
  }
  /*FUNCION PARA TOTALIZAR LAS VENTAS */
 getTotalVentas(ind){
    let cad ;
    if(this.dataSource != undefined){
      switch(ind){
        case 1:
          cad = this.dataSource.map(t => [t.REAL,t.NATURALEZA]).reduce((acc,[value,value1])=>acc+(2*value1-1)*value,0);
          break;
        case 2:
          cad = this.dataSource.map(t => [t.PRESUP,t.NATURALEZA]).reduce((acc,[value,value1])=>acc+(2*value1-1)*value,0);
          break;
        case 3:
          cad = this.dataSource.map(t => [t.REAL_ACUM,t.NATURALEZA]).reduce((acc,[value,value1])=>acc+(2*value1-1)*value,0);
          break;
        case 4:
          cad = this.dataSource.map(t => [t.PRESUP_ACUM,t.NATURALEZA]).reduce((acc,[value,value1])=>acc+(2*value1-1)*value,0);
          break;
        case 5:
          cad = this.dataSource.map(t => [t.PRESUP_ANHIO,t.NATURALEZA]).reduce((acc,[value,value1])=>acc+(2*value1-1)*value,0);
          break;        
      }
    }
    
    return cad;
  }
/* FUNCION PARA TOTALIZAR LOS SUELDOS Y GASTOS */
getTotalGastos(ind){
  let cad ;
  if(this.dataSource1 != undefined){
    switch(ind){
      case 1:
        cad = this.dataSource1.map(t => [t.REAL,t.NATURALEZA]).reduce((acc,[value,value1])=>acc+(-2*value1+1)*value,0);
        break;
      case 2:
        cad = this.dataSource1.map(t => [t.PRESUP,t.NATURALEZA]).reduce((acc,[value,value1])=>acc+(-2*value1+1)*value,0);
        break;
      case 3:
        cad = this.dataSource1.map(t => [t.REAL_ACUM,t.NATURALEZA]).reduce((acc,[value,value1])=>acc+(-2*value1+1)*value,0);
        break;
      case 4:
        cad = this.dataSource1.map(t => [t.PRESUP_ACUM,t.NATURALEZA]).reduce((acc,[value,value1])=>acc+(-2*value1+1)*value,0);
        break;
      case 5:
        cad = this.dataSource1.map(t => [t.PRESUP_ANHIO,t.NATURALEZA]).reduce((acc,[value,value1])=>acc+(-2*value1+1)*value,0);
        break;        
    }
  }
  
  return cad;
}

crearTablaResumen(){
  this.dataSource2 = [
    {NUMCUENTA:'',NAMECUENTA:'Ventas Netas', REAL: this.getTotalVentas(1), PRESUP: this.getTotalVentas(2), REAL_ACUM: this.getTotalVentas(3),PRESUP_ACUM:this.getTotalVentas(4),PRESUP_ANHIO:this.getTotalVentas(5),NATURALEZA:1},
    {NUMCUENTA:'',NAMECUENTA:'Sueldos y Gastos', REAL: this.getTotalGastos(1), PRESUP: this.getTotalGastos(2), REAL_ACUM: this.getTotalGastos(3),PRESUP_ACUM:this.getTotalGastos(4),PRESUP_ANHIO:this.getTotalGastos(5),NATURALEZA:1},
    {NUMCUENTA:'',NAMECUENTA:'Contribución Marginal', REAL: (this.getTotalVentas(1)-this.getTotalGastos(1)).toFixed(2), PRESUP: (this.getTotalVentas(2)-this.getTotalGastos(2)).toFixed(2), REAL_ACUM: (this.getTotalVentas(3)-this.getTotalGastos(3)).toFixed(2),PRESUP_ACUM:(this.getTotalVentas(4)-this.getTotalGastos(4)).toFixed(2),PRESUP_ANHIO:(this.getTotalVentas(5)-this.getTotalGastos(5)).toFixed(2),NATURALEZA:1},
  ];
}
 //    displayedColumns =
 //    ['name', 'position', 'weight', 'symbol', 'position', 'weight', 'symbol', 'star'];
 //   dataSource = ELEMENT_DATA;
}

export interface DatosTablaERXCCAnhio {
  NUMCUENTA: string;
	NAMECUENTA: string;
	REAL_JAN: number;
	PRESUP_JAN: number;
	REAL_FEB: number;
  PRESUP_FEB: number;
  REAL_MAR: number;
	PRESUP_MAR: number;
	REAL_APR: number;
  PRESUP_APR: number;
  REAL_MAY: number;
	PRESUP_MAY: number;
	REAL_JUN: number;
  PRESUP_JUN: number;
  REAL_JUL: number;
	PRESUP_JUL: number;
	REAL_AUG: number;
  PRESUP_AUG: number;
  REAL_SEP: number;
	PRESUP_SEP: number;
	REAL_OCT: number;
  PRESUP_OCT: number;
  REAL_NOV: number;
	PRESUP_NOV: number;
	REAL_DEC: number;
  PRESUP_DEC: number;
  NATURALEZA: number;
  REAL_JAN_ACUM: number;
  REAL_FEB_ACUM: number;
  REAL_MAR_ACUM: number;
  REAL_APR_ACUM: number;
  REAL_MAY_ACUM: number;
  REAL_JUN_ACUM: number;
  REAL_JUL_ACUM: number;
  REAL_AUG_ACUM: number;
  REAL_SEP_ACUM: number;
  REAL_OCT_ACUM: number;
  REAL_NOV_ACUM: number;
  REAL_DEC_ACUM: number;
  PRESUP_JAN_ACUM: number;
  PRESUP_FEB_ACUM: number;
  PRESUP_MAR_ACUM: number;
  PRESUP_APR_ACUM: number;
  PRESUP_MAY_ACUM: number;
  PRESUP_JUN_ACUM: number;
  PRESUP_JUL_ACUM: number;
  PRESUP_AUG_ACUM: number;
  PRESUP_SEP_ACUM: number;
  PRESUP_OCT_ACUM: number;
  PRESUP_NOV_ACUM: number;
  PRESUP_DEC_ACUM: number;
  PRESUP_ANHIO: number;
	
}
export interface DatosTablaERXCC {
  NUMCUENTA: string;
	NAMECUENTA: string;
	REAL: number;
	PRESUP: number;
	REAL_ACUM: number;
  PRESUP_ACUM: number;
  PRESUP_ANHIO: number;
  NATURALEZA:number;
	
}
export interface Depto{
  DEPTO: number;
	NOMBRE: string;
	
	
}
