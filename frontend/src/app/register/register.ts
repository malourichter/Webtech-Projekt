import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  ngOnInit() {
    document.body.style.overflow = 'hidden'; 
  }

  ngOnDestroy() {
    document.body.style.overflow = '';   
  }
}
