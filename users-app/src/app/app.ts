import { Component } from '@angular/core'
import { RouterOutlet, RouterLink } from '@angular/router'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <nav class="navbar navbar-dark bg-dark px-3">
    <a routerLink="/home" class="navbar-brand">Users App</a>
    <a routerLink="/newuser" class="btn btn-success">Nuevo Usuario</a>
  </nav>

  <router-outlet></router-outlet>
  `
})
export class AppComponent {}