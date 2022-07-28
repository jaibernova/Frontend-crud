import swal from 'sweetalert2';
import { EmpleadoService } from './../empleado.service';
import { Empleado } from './../empleado';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
// Clase para listar la cantidad de empleados almacenados en la base de datos
export class ListaEmpleadosComponent implements OnInit {

  // Array en el que se almacenaran los empleados obtenidos en la consulta a la api
  empleados: Empleado[];

  constructor(private empleadoServicio: EmpleadoService, private router: Router) { }

  // Ejecuta la funcion obtener empleados para obtener la infomacion de los datos registrados
  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  // Lleva el usuario a la ruta para actualizar los datos del empleado seleccionado y le envia su id por parametro
  actualizarEmpleado(id: number) {
    this.router.navigate(['actualizar-empleado', id]);
  }
  // Ejecuta la funcion para obtener el listado de empleados y los ingresa en el array empleados
  private obtenerEmpleados() {
    this.empleadoServicio.obtenerListaDeEmpleados().subscribe(empleado => {
      this.empleados = empleado;
    });
  }
  // Ejecuta la funcion eliminar empleado usando el id del empleado seleccionado
  eliminarEmpleado(id: number) {
    swal({
      title: 'Eliminar',
      text: "Deseas eliminar el registro?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then((result) => {
      if (result.value) {
        this.empleadoServicio.eliminarEmpleado(id).subscribe(() => {

          this.obtenerEmpleados();
          swal(
            'REgistro eliminado',
            'El registro ha sido eliminado con exito',
            'success'
          )
        })
      }
    })
  }

  // Este metodo redirige al usuario a la ruta para editar el empleado
  verDetallesDelEmpleado(id: number) {
    this.router.navigate(['empleado-detalles', id]);
  }
}
