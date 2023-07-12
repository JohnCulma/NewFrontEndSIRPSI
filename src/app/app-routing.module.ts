import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { ContentLayoutComponent } from "./shared/components/layout/content-layout/content-layout.component";
import { FullLayoutComponent } from "./shared/components/layout/full-layout/full-layout.component";
import { content } from "./shared/routes/content-routes";
import { full } from "./shared/routes/full.routes";
import { AdminGuard } from "./shared/guard/admin.guard";
import { UsuarioRolComponent } from './pages/roles/usuario-rol/usuario-rol.component';
import { isAutheticatedGuard } from "./guards/is-autheticated.guard";

const routes: Routes = [
    {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  // {
  //   path: "",
  //   redirectTo: "dashboard/default",
  //   pathMatch: "full",
  // },
  {
    path: "auth/login",
    component: LoginComponent,
  },
  {
    path: "roles/usuario",
    // canActivate: [isAutheticatedGuard],
    component: UsuarioRolComponent,
  },
  {
    path: "",
    component: ContentLayoutComponent,
    canActivate: [AdminGuard],
    children: content,
  },
  {
    path: "",
    component: FullLayoutComponent,
    canActivate: [AdminGuard],
    children: full,
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: "enabled",
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
