import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CilenteComponent } from './cliente/cilente.component';
import { DetalleComponent } from './cliente/detalle/detalle.component';
import { FormComponent } from './cliente/form.component';

const routes: Routes = [
{path: '', redirectTo: 'clientes', pathMatch:'full'},
{path: 'clientes', component:CilenteComponent},
{path: 'clientes/page/:page', component:CilenteComponent},
{path: 'clientes/form', component:FormComponent},
{path: 'clientes/form/:id', component:FormComponent},
// {path: 'clientes/ver/:id', component:DetalleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
