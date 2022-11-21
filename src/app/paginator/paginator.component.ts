import { Component, Input, OnInit, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input()

  paginadorHijo:any;
  paginas?:number[];

  desde:number = 0;
  hasta:number = 0;





  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes:SimpleChanges){
    let paginadorActualizado = changes['paginadorHijo'];

      if (paginadorActualizado.previousValue) {
          this.initPaginator();
      }

  }

  initPaginator():void{
    this.desde = Math.min(Math.max(1, this.paginadorHijo.number - 4), this.paginadorHijo.totalPages-5);
    this.hasta = Math.max(Math.min(this.paginadorHijo.totalPages, this.paginadorHijo.number + 4), 6);

    if (this.paginadorHijo.totalPages > 5) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice)=> (indice + this.desde));

    }else {
      this.paginas = new Array(this.paginadorHijo.totalPages).fill(0).map((_valor, indice)=> indice+1);

    }
  }

}
