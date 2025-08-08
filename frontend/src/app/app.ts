import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Login } from './login/login';
import { Footer } from './footer/footer';
import { Register } from './register/register';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Login, Register, Footer,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'projekt';
}
