import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-myorders',
  
  templateUrl: './myorders.component.html',
  styleUrl: './myorders.component.css'
})
export class MyordersComponent implements OnInit {
  Username: any;
  email: any;
  products: any;
  productdetail: any;
  showmessage: string='';

  
  constructor(public cartService: CartService, private router:Router, private http:HttpClient) {
    const userdetail = localStorage.getItem('userdetail')
    if (userdetail) {
      // Parse JSON string into object
      const userdetails = JSON.parse(userdetail);
     this.Username=userdetails.username
     this.email=userdetails.email
      // Now you can use the userdetails object
      console.log(userdetails);
    }
   }

   ngOnInit(): void {
       this.getmyorders();
   }


   getmyorders(){
 const email= {email:this.email}
    this.http.post<any>('http://localhost:3000/api/users/getmyorders/',email)
    .subscribe(
      response => {
        console.log('Signup successful:', response);
        this.products=response.products;
        this.productdetail=response;
       // this.router.navigate(['products']);
       if(response.length==0){
        this.showmessage='No Orders Found';
       }
      },
      error => {
        if (error.status === 404) {
         console.log('404')
         // alert(error.error.message);
        }
        if (error.status === 401) {
      //    alert(error.error.message);
      console.log('401')
        }
        console.error('Error signing up:', error);
        // Handle error
      }
    );
   }
   logout(){
    localStorage.clear()
    this.router.navigate(['/landing']);
   }
}
