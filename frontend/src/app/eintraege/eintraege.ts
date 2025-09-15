import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eintraege',
  templateUrl: './eintraege.html',
  styleUrls: ['./eintraege.css'],
  standalone: true,
  imports: [DatePipe, CommonModule, FormsModule]
})
export class Eintraege implements OnInit {
  entries: any[] = [];

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    fetch('http://localhost:3000/entry')
      .then(res => res.json())
      .then(data => {
        
        this.entries = data.filter((entry: any) => {
          if (entry.userId && typeof entry.userId === 'object' && entry.userId._id) {
            return entry.userId._id === userId;
          }
          return entry.userId?.toString() === userId;
        });
      });
  }
}