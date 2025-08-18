import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mood',
  imports: [RouterLink],
  templateUrl: './mood.html',
  styleUrl: './mood.css'
})
export class Mood  implements OnInit {
  datum: string = '';
  uhrzeit: string = '';

  ngOnInit() {
    const now = new Date();
    this.datum = now.toLocaleDateString('de-DE'); 
    this.uhrzeit = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }); 
  
}}

