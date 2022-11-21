import { HttpEventType } from '@angular/common/http';
import { NonNullAssert } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {

  @Input()
  cliente?: Cliente;

  constructor(
    private clienteService: ClienteService,
    public modalService:ModalService

  ) {}
  titulo: string = 'Detalle';
  fotoSeleccionada!: any;
  progreso: number = 0;

  ngOnInit(): void {
    // this.activetedRouter.paramMap.subscribe((params: any) => {
    //   let id: number = +params.get('id');
    //   if (id) {
    //     this.clienteService.getCliente(id).subscribe((cliente) => {
    //       this.cliente = cliente;
    //     });
    //   }
    // });
  }

  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;

    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error:', 'El archivo debe ser del tipo IMAGEN', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada || this.fotoSeleccionada == null) {
      Swal.fire('Error:', 'Debe seleccionar una foto', 'error');
    } else {
      console.log(this.fotoSeleccionada);
      this.clienteService
        .subirFoto(this.fotoSeleccionada, this.cliente?.idCliente)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (!event.total) {
              event.total = 100;
            }
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;

            this.modalService.notificarUpload.emit(this.cliente);

            Swal.fire(
              'La foto se subio completamente',
              response.mensjae,
              'success'
            );
          }

          // this.cliente= cliente;
        });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }


}
