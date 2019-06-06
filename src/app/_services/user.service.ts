import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../_models";

const httpOpcions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}



@Injectable()
export class UserService {
  private API: string = environment.API;
  constructor(
    private _http: HttpClient) {
  }

  /*********************************************************************************
   * Obtener  usuario por id
   * @param id
   */
  getById(id:number): Promise<any> {
    return this._http.get(`${this.API}/user/getbyid/${id}`)
      .toPromise()
      .then(response => UserService.getByIdSuccess(response))
      .catch(error => UserService.getByIdError(error));
  }
  private static getByIdError(error: any): Promise<any> {
    return Promise.reject(error.message);
  }

  private static getByIdSuccess(response: any): Promise<any> {
    return Promise.resolve(response);
  }
  /*********************************************************************************
   * Obtener todos los usuarioa
   * @param offset
   * @param limit
   */
  getAll(offset,limit): Promise<any> {
    return this._http.get(`${this.API}/user/getall`)
      .toPromise()
      .then(response => UserService.getAllSuccess(response))
      .catch(error => UserService.getAllError(error));
  }
  private static getAllError(error: any): Promise<any> {
    return Promise.reject(error.message);
  }

  private static getAllSuccess(response: any): Promise<any> {
    return Promise.resolve(response);
  }

  /********************************************************************************************
   * Insertar Usuario Nuevo
   * @param user
   */
  insert(user: User,flag: boolean): Promise<any> {
    let url = `${this.API}/user/insert`;
    if(flag)
    {
      url = `${this.API}/cliente/insert_user`;
    }
    return this._http.post(url, JSON.stringify(user),httpOpcions)
      .toPromise()
      .then(response => UserService.insertSuccess(response))
      .catch(error => UserService.insertError(error));
  }
  private static insertError(error: any): Promise<any> {
    return Promise.reject(error.message);
  }

  private static insertSuccess(response: any): Promise<any> {
    return Promise.resolve(response);
  }

  /********************************************************************************************
   * Insertar Usuario Nuevo
   * @param user
   */
  update(user: User): Promise<any> {
    let url = `${this.API}/user/update`;
    console.log(user);
    return this._http.post(url, JSON.stringify(user),httpOpcions)
      .toPromise()
      .then(response => UserService.updateSuccess(response))
      .catch(error => UserService.updateError(error));
  }
  private static updateError(error: any): Promise<any> {
    return Promise.reject(error.message);
  }

  private static updateSuccess(response: any): Promise<any> {
    return Promise.resolve(response);
  }

  /********************************************************************************************
   * Insertar Usuario Nuevo
   * @param user
   */
  delete(id: number): Promise<any> {
    let url = `${this.API}/user/delete/${id}`;
    return this._http.put(url,httpOpcions)
      .toPromise()
      .then(response => UserService.updateSuccess(response))
      .catch(error => UserService.updateError(error));
  }
  private static deleteError(error: any): Promise<any> {
    return Promise.reject(error.message);
  }

  private static deleteSuccess(response: any): Promise<any> {
    return Promise.resolve(response);
  }

  /********************************************************************************************
   * get Cliente by Id
   * @param id
   */
  getCliente(id:string): Promise<any> {
    return this._http.get(`${this.API}/cliente/get/${id}`)
      .toPromise()
      .then(response => UserService.getClienteSuccess(response))
      .catch(error => UserService.getClienteError(error));
  }
  private static getClienteError(error: any): Promise<any> {
    return Promise.reject(error.message);
  }

  private static getClienteSuccess(response: any): Promise<any> {
    return Promise.resolve(response);
  }

}
