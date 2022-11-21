import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Cliente } from './cliente';
import {catchError, map, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate} from '@angular/common';
import { Region } from './region';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url:string="http://localhost:9898/api/clientes"
  constructor(private http:HttpClient, private router:Router) { }

  getRegiones():Observable<Region[]>{
    return this.http.get<Region[]>(this.url + "/regiones");
  }

  getClientes(page:number): Observable<any> {
   // return this.http.get<Cliente[]>(this.url);
   return this.http.get(`${this.url}/page/${page}`).pipe(
    tap((response:any) => {
      console.log('ClienteService: tap 1 ');
      (response.content as Cliente[]).forEach(cliente =>{
        console.log(cliente.nombre);
      });

    }),
    map((response:any) => {
     (response.content as Cliente[]).map(cliente => {
       cliente.nombre = cliente.nombre!.toUpperCase();
        cliente.fecha = formatDate(cliente.fecha!, 'EEEE dd, MMMM yyyy', 'es-PE');
        //let datePipe = new DatePipe('en-US');
        //cliente.fecha = datePipe.transform(cliente.fecha!, 'dd-MM-yyyy');
        return cliente;
      });
      return response;

  }),
    tap(response=> {
      console.log('ClienteService: tap 2 ');
      (response.content as Cliente[]).forEach(cliente => {
        console.log(cliente.nombre);
      })

    })
  )
  }


  getCliente(id:any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['clientes'])
        console.log('ERRORRRR: ' + e.error.mensjae);
        Swal.fire('Error al editar', e.error.mensjae, 'error');
        return throwError(()=> e);
      })
    );
  }

  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post(this.url, cliente).pipe(
      map((response:any)  => response.cliente as Cliente),
      catchError(e=>{

        if(e.status == 400) {
          return throwError(()=>e);
        }

        console.log(e.error.mensjae);
        Swal.fire('Error al crear', e.error.mensjae,'error');
        return throwError(()=> e)
      })
    );
  }

  update(cliente:Cliente):Observable<any>{
    return this.http.put (this.url, cliente).pipe(
      catchError(e=>{

        if(e.status == 400) {
          return throwError(()=>e);
        }

        console.log(e.error.mensjae);
        Swal.fire('Error al actualizar', e.error.mensjae,'error')
        return throwError(()=> e)
      })
    );
  }

  delete(id:any){
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(e => {
        console.log('ERRORRRR: ' + e.error.mensjae);
        Swal.fire('Error al eliminar', e.error.error, 'error');
        return throwError(()=> e);
      })
    );
  }



  subirFoto(archivo:File, id:any):Observable<HttpEvent<{}>>{
    let formData = new FormData();


    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.url}/upload`, formData, {
      reportProgress: true
    });


    return this.http.request(req);

  }

}
