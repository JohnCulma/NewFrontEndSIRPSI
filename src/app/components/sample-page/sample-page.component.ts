import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from 'src/services/empresa.service';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})
export class SamplePageComponent implements OnInit {

  listEmpresas: any[] = [];
  // accion = 'Agregar';
  form: FormGroup;
  id: string | undefined;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _EmpresaService: EmpresaService) {
    this.form = this.fb.group({
      documento: ['', Validators.required],
      digitoVerificacion: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      nombre:['', Validators.required],
      // fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      // cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });
   }

  ngOnInit(): void {
    this.obtenerEmpresas();
  }

  obtenerEmpresas() {
    // this._EmpresaService.getListEmpresas().subscribe(data => {
    //   console.log(data);
    //   this.listEmpresas = data;
    // }, error => {
    //   console.log(error);
    // })
  }

  guardarEmpresa() {

    const empresa: any = {
      documento: this.form.get('documento')?.value,
      digitoVerificacion: this.form.get('digitoVerificacion')?.value,
      nombre: this.form.get('nombre')?.value,
    }

    if(this.id == undefined) {
      // Agregamos una nueva empresa
        this._EmpresaService.saveEmpresa(empresa).subscribe(data => {
          this.toastr.success('La empresa fue registrada con exito!', 'Empresa registrada');
          this.obtenerEmpresas();
          this.form.reset();
        }, error => {
          this.toastr.error('Opss.. ocurrio un error','Error')
          console.log(error);
        })
    }else {

      empresa.id = this.id;
      // Editamos empresa
      this._EmpresaService.updateEmpresa(this.id,empresa).subscribe(data => {
        this.form.reset();

        this.id = undefined;
        this.toastr.info('La empresa fue actualizada con exito!', 'Empresa Actualizada');
        this.obtenerEmpresas();
      }, error => {
        console.log(error);
      })
    }   
  }

  eliminarEmpresa(id: string) {
    this._EmpresaService.deleteEmpresa(id).subscribe(data => {
      this.toastr.error('La empresa fue eliminada con exito!','Empresa eliminada');
      this.obtenerEmpresas();
    }, error => {
      console.log(error);
    })

  }

  editarEmpresa(empresa: any) {
    // this.accion = 'Editar';
    this.id = empresa.id;

    this.form.patchValue({

      documento: empresa.documento,
      digitoVerificacion: empresa.digitoVerificacion,
      nombre: empresa.nombre,
    })
  }

}
