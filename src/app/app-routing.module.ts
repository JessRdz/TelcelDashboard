import { NodeChartComponent } from './componentes/node-chart/node-chart.component';
import { ChartComponent } from './componentes/chart/chart.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { NotifacionesComponent } from './componentes/notifaciones/notifaciones.component';
import { SigmaComponent } from './componentes/sigma/sigma.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'notificaciones', component: NotifacionesComponent },
  { path: 'graficas', component: NodeChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
