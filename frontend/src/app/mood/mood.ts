import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mood',
  imports: [RouterLink],
  templateUrl: './mood.html',
  styleUrl: './mood.css'
})
export class Mood implements OnInit {
  datum: string = '';
  uhrzeit: string = '';
  selectedMood: string = '';
  userId: string = '';
  userName: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const now = new Date();
    this.userName = localStorage.getItem('name') || '';
    this.datum = now.toLocaleDateString('de-DE');
    this.uhrzeit = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    this.userId = localStorage.getItem('userId') || '';
  }

  selectMood(mood: string) {
    this.selectedMood = mood;
    localStorage.setItem('mood', mood);
  }

  saveEntry() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    this.http.post<any>('http://localhost:3000/entry', {
      userId: this.userId,
      mood: this.selectedMood,
      datum: this.datum,
      uhrzeit: this.uhrzeit
    }, { headers }).subscribe({
      next: data => console.log(data),
      error: err => console.error('Fehler beim Speichern:', err)
    });
  }
}