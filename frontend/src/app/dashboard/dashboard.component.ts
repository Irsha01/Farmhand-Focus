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
    "name": "Germany",
    "value": 1500
  },
  {
    "name": "USA",
    "value": 3000
  },
  {
    "name": "France",
    "value": 4500
  },
  {
    "name": "India",
    "value": 1800
  },
  {
    "name": "UK",
    "value": 4500
  },
  {
 
    "name": "Australia",
    "value": 1800
  },
  {
    "name": "Africa",
    "value": 4500
  },
  {
    "name": "United States",
    "value": 1800
  },
  {
    "name": "Canada",
    "value": 4500
  },
  {
    "name": "Uae",
    "value": 1800
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
