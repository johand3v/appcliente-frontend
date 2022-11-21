import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Region } from './region';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  errores:string[] = [];
  regiones:Region[] = [];
  cliente:Cliente = new Cliente();

 titulo:string = 'REGISTRO DE CLIENTES';
  constructor(private clienteService:ClienteService, private router:Router,
    private activeteRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
    this.clienteService.getRegiones().subscribe(data => this.regiones = data);

  }

  cargarCliente(){
    this.activeteRoute.params.subscribe(param => {
      let id = param['id'];
      console.log(id);

      if (id) {
        this.clienteService.getCliente(id).subscribe((data) => this.cliente = data);
      }
    })
  }


  create():any{
    console.log(this.cliente);
   this.clienteService.create(this.cliente).
   subscribe(cliente => {
    this.router.navigate(['clientes']);
    Swal.fire('Nuevo Cliente', `El cliente ha sido creado a ${cliente.nombre} con exito`,'success');

  },
    err=> {
      this.errores = err.error.errors as string[];
    }
  );

  }

  update(){
    console.log(this.cliente);
    this.clienteService.update(this.cliente).
    subscribe(data => {
     this.router.navigate(['clientes']);
     Swal.fire('Cliente', `${data.mensjae} : ${data.cliente.nombre}`,'success');
   },
   err=> {
     this.errores = err.error.errors as string[];
   }

   );
   }

   compararRegion(o1:Region, o2:Region){
    if(o1 === undefined && o2 === undefined){
      return true;
    }

    return o1 == null || o2 == null ? false : o1.idRegion == o2.idRegion;
   }
}
