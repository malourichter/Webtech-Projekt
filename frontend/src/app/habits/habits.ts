import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habits',
  imports: [NgClass],
  templateUrl: './habits.html',
  styleUrl: './habits.css'
})
export class Habits {
  selectedHabits: string[] = [];

  constructor(private router: Router) {}
  toggleActive(habit: string) {
    const index = this.selectedHabits.indexOf(habit);
    if (index === -1) {
      this.selectedHabits.push(habit);
    } else {
      this.selectedHabits.splice(index, 1);
    }
  }

  isActive(habit: string): boolean {
    return this.selectedHabits.includes(habit);
  }


  saveHabits() {
   
    localStorage.setItem('habits', JSON.stringify(this.selectedHabits));
    this.router.navigate(['/notizen']);
  }
}
