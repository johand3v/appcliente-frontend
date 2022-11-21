import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CilenteComponent } from './cliente/cilente.component';
import {HttpClientModule} from '@angular/common/http';
import { FormComponent } from './cliente/form.component';
import { FormsModule} from '@angular/forms';
import localeES from '@angular/common/locales/es'
import {registerLocaleData } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { DetalleComponent } from './cliente/detalle/detalle.component';






registerLocaleData(localeES)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CilenteComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatNativeDateModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
