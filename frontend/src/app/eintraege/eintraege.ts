import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { EntryService } from './eintraege.service';

@Component({
  selector: 'app-eintraege',
  templateUrl: './eintraege.html',
  styleUrls: ['./eintraege.css'],
  standalone: true,
  imports: [DatePipe, CommonModule]
})
export class Eintraege implements OnInit {
  entries: any[] = [];

  constructor(private entryService: EntryService) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.entryService.getEntries().subscribe(data => {
      this.entries = data.filter((entry: any) => {
        if (entry.userId && typeof entry.userId === 'object' && entry.userId._id) {
          return entry.userId._id === userId;
        }
        return entry.userId?.toString() === userId;
      });
    });
  }
}