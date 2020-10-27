import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';

import {MatToolbarModule} from '@angular/material/toolbar';

import { MDBBootstrapModule, NavbarModule, WavesModule, ButtonsModule, ChartsModule } from 'angular-bootstrap-md';
import { ModalModule, TooltipModule, PopoverModule, CardsModule, TableModule} from 'angular-bootstrap-md'
import { SigmaComponent } from './componentes/sigma/sigma.component';
import { NotifacionesComponent } from './componentes/notifaciones/notifaciones.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ChartComponent } from './componentes/chart/chart.component';
import { NodeChartComponent } from './componentes/node-chart/node-chart.component'



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SigmaComponent,
    NotifacionesComponent,
    InicioComponent,
    ChartComponent,
    NodeChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
