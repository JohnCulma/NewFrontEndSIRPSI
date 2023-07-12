import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule, HttpLoaderFactory } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { ToastrModule } from "ngx-toastr";
import { DecimalPipe } from "@angular/common";

import { AdminGuard } from "./shared/guard/admin.guard";
import { CookieService } from "ngx-cookie-service";
import "hammerjs";
import "mousetrap";
import { UsuarioRolComponent } from "./pages/roles/usuario-rol/usuario-rol.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasModule } from './aplicaciones/empresas/empresas.module';
import { MinisteriosModule } from './aplicaciones/ministerios/ministerios.module';
import { CentrotrabajoModule } from './aplicaciones/centrotrabajo/centrotrabajo.module';


@NgModule({
  declarations: [AppComponent, LoginComponent, UsuarioRolComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgbModule,
    EmpresasModule,
    MinisteriosModule,
    CentrotrabajoModule,  
  ],
  providers: [ AdminGuard, CookieService, DecimalPipe],
  bootstrap: [AppComponent],
  exports: [

  ],
})
export class AppModule {}
