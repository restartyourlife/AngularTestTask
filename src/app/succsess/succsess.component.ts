import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-succsess',
  templateUrl: './succsess.component.html',
  styleUrls: ['./succsess.component.css'],
})
export class SuccsessComponent {
  constructor(private router: Router) {}

  goToForm() {
    this.router.navigate(['']);
  }
}
