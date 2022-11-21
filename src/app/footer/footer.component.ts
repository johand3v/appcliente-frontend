import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  autor:any = {nombre:"Juan" , apellido:'Sanchez'}

  constructor() { }

  ngOnInit(): void {
  }

}
