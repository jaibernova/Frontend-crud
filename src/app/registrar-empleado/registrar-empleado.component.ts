import { EmpleadoService } from './../empleado.service';
import { Empleado } from './../empleado';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css']
})
export class RegistrarEmpleadoComponent implements OnInit {

  empleado: Empleado = new Empleado();
  constructor(private empleadoServicio: EmpleadoService, private router: Router) { }

  ngOnInit(): void {
  }
  // Con este metodo se ejecuta el metodo que permite guardar el empleado en el formulario
  onSubmit() {
    this.guardarEmpleado();
  }

  // Con este metodo se confirma el nuevo registro y se redirecciona a la pagina principal
  irALaListaDeEmpleados() {
    this.router.navigate(['/empleados']);
    swal('Empleado registrado', `El empleado ${this.empleado.nombre} ha sido registrado con exito`, `success`);
  }
  
  // Con este metodo se realiza la llamada al servicio que realiza la peticion post para crear el nuevo empleado
  guardarEmpleado() {
    this.empleadoServicio.registrarEmpleado(this.empleado).subscribe(() => {
      this.irALaListaDeEmpleados();
    }, error => console.log(error));
  }




}
