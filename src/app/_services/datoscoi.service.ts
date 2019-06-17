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

    return this._http.post(url, JSON.stringify(mesanhio),httpOpcions)
    .toPromise();
   
 }

 /*
    Obtener BalanzaDpto por mes 
  */
 getBalanzaXDpto_MesAnhio(mesanhio: Fechamesanhio):Promise<any>{

    
  let url = `${this.API}/app/datos_coi/getDatosCuentasXDpto`;
  console.log(mesanhio);
  return this._http.post(url, JSON.stringify(mesanhio),httpOpcions)
  .toPromise();
 
}

 
}
