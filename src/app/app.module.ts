import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDadataModule } from '@kolkov/ngx-dadata';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuccsessComponent } from './succsess/succsess.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [AppComponent, SuccsessComponent, FormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDadataModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
