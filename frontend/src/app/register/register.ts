import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

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

  constructor(private router: Router) {}

  registerUser() {
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.name,
        email: this.email,
        password: this.password
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        localStorage.setItem('userName', this.name);
        this.router.navigate(['/mood']);
      } else {
        this.error = data.error || 'Registrierung fehlgeschlagen!';
      }
    })
    .catch(() => {
      this.error = 'Serverfehler!';
    });
  }
}
