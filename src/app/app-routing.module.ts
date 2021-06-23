import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { SuccsessComponent } from './succsess/succsess.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
  },
  {
    path: 'succsess',
    component: SuccsessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
