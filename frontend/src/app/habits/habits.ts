import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-habits',
  imports: [RouterLink, NgClass],
  templateUrl: './habits.html',
  styleUrl: './habits.css'
})
export class Habits {
activeEmojis = new Set<string>();

toggleActive(emoji: string) {
  if (this.activeEmojis.has(emoji)) {
    this.activeEmojis.delete(emoji);
  } else {
    this.activeEmojis.add(emoji);
  }
}

isActive(emoji: string): boolean {
  return this.activeEmojis.has(emoji);
}
}
