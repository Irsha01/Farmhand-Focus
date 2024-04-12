// sidenav.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  // SidenavComponent logic
constructor(private router:Router){}
  login(){
    
    this.router.navigate(['/login']);
  }
}
