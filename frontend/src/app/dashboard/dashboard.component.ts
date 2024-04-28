import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
userdetails:any
Username:any
constructor(private router:Router){
  const userdetail = localStorage.getItem('userdetail')
  if (userdetail) {
    // Parse JSON string into object
    const userdetails = JSON.parse(userdetail);
   this.Username=userdetails.username
    // Now you can use the userdetails object
    console.log(userdetails);
  }
}

ngOnInit(){
 
}


single = [
  {
    "name": "January",
    "value": 2600
  },
  {
    "name": "February",
    "value": 3000
  },
  {
    "name": "March",
    "value": 3700
  },
  {
    "name": "April",
    "value": 4800
  },
  {
    "name": "May",
    "value": 2500
  },
  {
 
    "name": "June",
    "value": 4700
  },
  {
    "name": "July",
    "value": 8500
  },
  {
    "name": "August",
    "value": 3800
  },
  {
    "name": "September",
    "value": 3500
  },
  {
    "name": "October",
    "value": 1800
  },
  {
    "name": "November",
    "value": 5400
  },
  {
    "name": "December",
    "value": 9000
  },
];

view: [number, number] = [1300, 400];

colorScheme = 'cool';
// colorScheme = {
//   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
// };

gradient = false;
showXAxis = true;
showYAxis = true;

// Other options like showXAxis, showYAxis, etc. can be defined here
showLegend = true;
showXAxisLabel = true;
xAxisLabel = 'Agriculture';
showYAxisLabel = true;
yAxisLabel = 'Population';

onSelect(event:any) {
  console.log(event);
}


logout(){
  localStorage.clear()
  this.router.navigate(['/landing']);
}
}
