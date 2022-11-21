import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-cilente',
  templateUrl: './cilente.component.html',
  styleUrls: ['./cilente.component.css'],
})
export class CilenteComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteSeleccionado?:Cliente;


  paginadorPadre:any;

  constructor(
    private clienteService: ClienteService,
    private modalService:ModalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log('page : ' + params.get('page'));

      let numPage = params.get('page');
      if (!numPage) {
        numPage = '0';
      }
      let page = +numPage;

      this.clienteService
        .getClientes(page)
        .pipe(
          tap((response) => {
            console.log('ClienteComponent: tap 3');
            (response.content as Cliente[]).forEach((cliente) => {
              console.log(cliente.nombre);
            });
          })
        )
        .subscribe(data =>  {
         this.clientes = data.content
         this.paginadorPadre = data;
        });

        });

        this.modalService.notificarUpload.subscribe(cliente =>{

          this.clientes = this.clientes.map(clienteOriginal => {

            if(cliente.idCliente == clienteOriginal.idCliente){
              clienteOriginal.foto=cliente.foto;
            }
            return clienteOriginal;
          })
        })
  }

  deleteCliente(cliente: Cliente) {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: 'Vas a eliminar a ' + cliente.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.idCliente).subscribe((response) => {
          this.clientes = this.clientes.filter((cli) => cli != cliente);
          Swal.fire(
            'Deleted!',
            `¡Cliente ${cliente.nombre} elimina con éxito!`,
            'success'
          );
        });
      }
    });
  }

  abrirModal(cliente:Cliente){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();

  }

}
