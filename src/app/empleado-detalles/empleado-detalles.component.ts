import  swal  from 'sweetalert2';
import { EmpleadoService } from './../empleado.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empleado } from '../empleado';

@Component({
  selector: 'app-empleado-detalles',
  templateUrl: './empleado-detalles.component.html',
  styleUrls: ['./empleado-detalles.component.css']
})
export class EmpleadoDetallesComponent implements OnInit {

  id:number;
  empleado:Empleado;
  constructor(private route:ActivatedRoute,private empleadoServicio:EmpleadoService) { }

  // Se inicializa el empleado seleccionado obteniendo los datos de la base de datos
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.empleado = new Empleado();
    this.empleadoServicio.obtenerEmpleadoPorId(this.id).subscribe(dato => {
      this.empleado = dato;
      swal(`Detalles del registro ${this.empleado.nombre}`);
    });
  }

}
