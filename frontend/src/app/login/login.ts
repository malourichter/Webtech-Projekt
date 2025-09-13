import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
 email: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {}

  loginUser() {
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.email, password: this.password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.user && data.user.id) {
        localStorage.setItem('userId', data.user.id); // User-ID speichern
        this.router.navigate(['/mood']); // Weiterleiten
      } else {
        this.error = 'Login fehlgeschlagen!';
      }
    })
    .catch(() => {
      this.error = 'Serverfehler!';
    });
  }
}