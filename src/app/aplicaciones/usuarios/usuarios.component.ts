import { Component, QueryList, ViewChildren, inject } from '@angular/core';
import { NgbdSortableHeader } from 'src/app/shared/directives/NgbdSortableHeader';
import { TableService } from 'src/app/shared/services/table.service';
import { UsuarioService } from 'src/services/usuario.service';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EstadosService } from 'src/services/estados.service';
import { EmpresaService } from 'src/services/empresa.service';
import { TiposDocumentoService } from 'src/services/tipos-documento.service';
import { PaisService } from 'src/services/pais.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RolService } from 'src/services/rol.service';
import { Usuario } from 'src/app/interface';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
//Servicios
  private _usuarioService = inject ( UsuarioService );
  public  _estados =        inject ( EstadosService );
  public _empresas =        inject ( EmpresaService );
  public _tiposDoc =        inject ( TiposDocumentoService );
  public _paises =          inject ( PaisService );
  public _roles =           inject ( RolService )
  private fb =              inject ( FormBuilder );
  private toastr =          inject ( ToastrService );

//Variables
  public selected = [];
  listUsuario: any;
  status: string;
  errorMessage: any;
  closeResult: string;
  estadosList: any;
  listEmpresas: any;
  listDocs: any;
  listPaises: any;
  formSaveUsuario: FormGroup;
  id: string | undefined;
  listRoles: any;
  selectTipoDoc: any;

  datosUsuario : Usuario ;

  //Model
  public usuarioModel : Usuario = {
    IdTypeDocument: '',
    Document:       '',
    IdCountry:      '',
    IdCompany:      '',
    Names:          '',
    Surnames:       '',
    IdRol:          '',
    Password:       '',
    PhoneNumber:    '',
    Email:          '',
    IdEstado:       ''
 };
  selectPais: string;
  selectRol: string;
  selectEmpresa: string;
  selectEstado: string;

  constructor(public service: TableService, private modalService: NgbModal) {

  }

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  ngOnInit() {
    this.obtenerUsuario();
  }

//Crud - getUsuario
  obtenerUsuario() {
    this._usuarioService.getUsuarios().subscribe(data => {
      this.listUsuario = data;        
    }, error => {
      console.log(error);
    });
  }

//Selecciones de id
  onChangeIdTypoDoc(selectIdTipoDoc:string){
 this.selectTipoDoc = selectIdTipoDoc;
  }

  onChangePais(selectPais:string){
    this.selectPais = selectPais;
  }

  onChangeRol(selectIdRol:string){
    this.selectRol = selectIdRol;
  }

  onChangeEmpresa(selectIdEmpresa:string){
    this.selectEmpresa = selectIdEmpresa;
  }  

  onChangeEstado(selectIdEstado:string){
    this.selectEstado = selectIdEstado;
  }


//Modal
  openModalSave(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getEstados(){
    this._estados.getEstados().subscribe((data:any) => {
      this.estadosList = data;
    });
  }

  getEmpresasUsuario(){
  this._empresas.getListEmpresasUsuario().subscribe((data:any)=> {
  this.listEmpresas = data;
  });
  }

  getTiposDocumento(){
    this._tiposDoc.getTipoDocumento().subscribe((data:any)=> {
      this.listDocs = data;
      });    
  }

  getPaises(){
    this._paises.getPais().subscribe((data:any)=> {
      this.listPaises = data;
      });    
  }

  getRol(){
    this._roles.getRoles().subscribe((data:any)=> {
      this.listRoles = data;
      });    
  }

  onOpenModalSave(content){
    this.getEmpresasUsuario();
    this.getEstados();
    this.getTiposDocumento();
    this.getPaises();
    this.getRol();  
    this._tiposDoc.getTipoDocumento();  
    this.modalService.open(content, { size: 'lg' });  
  }


  public onSave(){
    this.usuarioModel.IdTypeDocument = this.selectTipoDoc;
    this.usuarioModel.IdCountry = this.selectPais;
    this.usuarioModel.IdCompany = this.selectEmpresa;
    this.usuarioModel.IdRol = this.selectRol;
    this.usuarioModel.IdEstado = this.selectEstado;
    this._usuarioService.saveUsuario(this.usuarioModel).subscribe({
      next: data => {
        debugger
        console.log(data);
        this.obtenerUsuario();
        this.toastr.success('Usuario Registrado, exitosamente!');
      
      },
      error: error => {
        debugger
          this.errorMessage = error.error.message;
          console.log('error usuario' + error.error.message)
          this.toastr.error('Ha ocurrido un error! '+ this.errorMessage);
          this.obtenerUsuario();
      }
  }); 

  }

  public onSelect(selected) {
    this.service.deleteSingleData(selected);
  }

//Crud - Update
  public onUpdate(content) {

    this.getEmpresasUsuario();
    this.getEstados();
    this.getTiposDocumento();
    this.getPaises();
    this.getRol();  
    
    this.modalService.open(content, { size: 'lg' });  
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  //Crud - Eliminar
  public onDelete(selected) {   
    Swal.fire({
      title: '¡Esta seguro de eliminar este usuario?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No eliminar`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._usuarioService.deleteUsuarios(selected).subscribe({
          next: data => {
            console.log(data);
            Swal.fire('Usuario eliminado!', '', 'success');
            this.obtenerUsuario();
          },
          error: error => {
              this.errorMessage = error.error.message;
              Swal.fire('Ha ocurrido un error! '+ this.errorMessage , '', 'error');
              this.obtenerUsuario();
          }
      }); 

      } else if (result.isDenied) {
        Swal.fire('Cambios no se guardaron', '', 'info')
      }
    });
  }
}
