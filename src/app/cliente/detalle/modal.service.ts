import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal?:boolean;
  private _notificarUpload:any = new EventEmitter<any>();

  constructor() { }

  get notificarUpload():EventEmitter<any> {
    return this._notificarUpload;
  }

  abrirModal(){
    this.modal = true;
  }

  cerrarModal(){
    this.modal = false;
  }


}
