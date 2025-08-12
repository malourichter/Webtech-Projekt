import { Component,OnInit, OnDestroy  } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit, OnDestroy{
ngOnInit() {
    document.body.style.overflow = 'hidden';  // Scrollen aus
  }

  ngOnDestroy() {
    document.body.style.overflow = '';        // Scrollen wieder an
  }

}
