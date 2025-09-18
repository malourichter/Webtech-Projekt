import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
name: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

constructor(private http: HttpClient, private router: Router) {}

   registerUser() {
  
    if (!this.name || !this.email || !this.password) {
      this.error = 'Bitte alle Felder ausfüllen!';
      return;
    }

    this.http.post<any>('http://localhost:3000/register', {
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: data => {
        this.error = '';
        localStorage.setItem('name', this.name);
        this.router.navigate(['/login']);
      },
      error: err => {
        this.error = err.error?.message || 'Registrierung fehlgeschlagen!';
      }
    });
  }
}