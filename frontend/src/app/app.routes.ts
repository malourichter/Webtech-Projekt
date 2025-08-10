import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import { Mood } from './mood/mood';
import { Habits } from './habits/habits';


export const routes: Routes = [
    { path: '', component: Login }, 
    { path: 'register', component: Register },
    { path: 'mood', component: Mood},
    { path: 'habits', component: Habits}
];

