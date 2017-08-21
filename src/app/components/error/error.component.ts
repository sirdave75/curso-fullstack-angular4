import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: '../../view/error/error.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  public titulo: string;
  constructor() {
    this.titulo = 'Error 404!!  Página no encontrada.';
  }

  ngOnInit() {
    console.log('Componente error.conponent.ts cargado!!');
  }

}
