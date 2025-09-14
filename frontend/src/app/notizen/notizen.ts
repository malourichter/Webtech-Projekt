import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notizen',
  imports: [FormsModule],
  templateUrl: './notizen.html',
  styleUrl: './notizen.css'
})
export class Notizen {
  notiz: string = '';

  constructor(private router: Router) {}

  saveEntry() {
    const userId = localStorage.getItem('userId') || '';
    const mood = { name: localStorage.getItem('mood') || '' };
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    const datum = new Date();
    const uhrzeit = new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

    fetch('http://localhost:3000/entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        mood,
        habits,
        notizen: this.notiz,
        datum,
        uhrzeit
      })
    })
    .then(res => res.json())
    .then(data => {
     // LocalStorage leeren
      localStorage.removeItem('mood');
      localStorage.removeItem('habits');
      localStorage.removeItem('notizen');
      this.router.navigate(['/eintraege']);
    });
  }
}