import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eintraege',
  templateUrl: './eintraege.html',
  styleUrls: ['./eintraege.css'],
  standalone: true,
  imports: [DatePipe, CommonModule, FormsModule]
})
export class Eintraege implements OnInit {
  entries: any[] = [];
  constructor(private http: HttpClient,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.http.get<any[]>('http://localhost:3000/entry').subscribe(data => {
      this.entries = data.filter((entry: any) => {
        if (entry.userId && typeof entry.userId === 'object' && entry.userId._id) {
            return entry.userId._id === userId;
          }
          return entry.userId?.toString() === userId;
        });
        this.cdr.detectChanges();
      });
  }

  deleteEntry(entryId: string) {
    this.http.delete(`http://localhost:3000/entry/${entryId}`).subscribe(() => {
      this.entries = this.entries.filter(entry => entry._id !== entryId);
      this.cdr.detectChanges();
    });
}

showConfirmDialog = false;
entryToDelete: string | null = null;

openConfirmDialog(entryId: string) {
  this.entryToDelete = entryId;
  this.showConfirmDialog = true;
}

closeConfirmDialog() {
  this.showConfirmDialog = false;
  this.entryToDelete = null;
}

confirmDelete() {
  if (this.entryToDelete) {
    this.deleteEntry(this.entryToDelete); 
    this.entries = this.entries.filter(entry => entry._id !== this.entryToDelete);
    this.closeConfirmDialog();
  }
}
}
