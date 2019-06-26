import { Injectable, Component } from '@angular/core';

import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Fechamesanhio} from "../_interfaces/fechamesanhio";
import { Balanzacoi } from '../_interfaces/balanzacoi';
import { Observable } from 'rxjs';

 
const httpOpcions = {
  headers : new HttpHeaders({'Content-Type' : 'application/json' })
}
@Injectable()
export class DatoscoiService {
  
  private API: string = environment.API;
  constructor(private _http: HttpClient ) { }

   /*
      Obtener Balanza por mes
    */
    getBalanza_MesAnhio(mesanhio: Fechamesanhio):Promise<any>{

    
    let url = `${this.API}/app/datos_coi/getDatosCuentas`;

    return this._http.post(url, JSON.stringify([mesanhio]),httpOpcions)
    .toPromise();
   
    }

    /*
       Obtener BalanzaDpto por mes 
    */
    getBalanzaXDpto_MesAnhio(mesanhio: Fechamesanhio):Promise<any>{

    
        let url = `${this.API}/app/datos_coi/getDatosCuentasXDpto`;
        console.log(mesanhio);
        return this._http.post(url, JSON.stringify([mesanhio]),httpOpcions)
          .toPromise();
 
    }

    /*
       //Obtener Datos Ventas por departamentos para EC por CC  
    */
    getDatosVentasXDptoParaERXCC_MesAnhio(mesanhio: Fechamesanhio,dpto:number):Promise<any>{

     let mesanhiodpto = {
       month: mesanhio.month,
       anhio: mesanhio.anhio,
       dpto: dpto
     }
      let url = `${this.API}/app/datos_coi/getDatosVentasXDptoParaERXCC`;
      //let url = `${this.API}/app/datos_coi/getDatosGastosGeneralesXDptoParaERXCC`;
      console.log(dpto);
      return this._http.post(url, JSON.stringify(mesanhiodpto),httpOpcions)
      .toPromise();
 
    }
       /*
         //Obtener Datos Ventas por departamentos para EC por CC  
       */
    getDatosGastosGeneralesXDptoParaERXCC_MesAnhio(mesanhio: Fechamesanhio,dpto:number):Promise<any>{

      let mesanhiodpto = {
        month: mesanhio.month,
        anhio: mesanhio.anhio,
        dpto: dpto
      }
      //let url = `${this.API}/app/datos_coi/getDatosVentasXDptoParaERXCC`;
      let url = `${this.API}/app/datos_coi/getDatosGastosGeneralesXDptoParaERXCC`;
      console.log(mesanhio);
      return this._http.post(url, JSON.stringify(mesanhiodpto),httpOpcions)
      .toPromise();

  }

  /*
      Obtener Departamentos
    */
   getDepartamentos():Promise<any>{

    
    let url = `${this.API}/app/datos_coi/getDepartamentos`;

    return this._http.post(url, '',httpOpcions)
    .toPromise();
   
    }

}
