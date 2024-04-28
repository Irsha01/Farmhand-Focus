// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { CartService } from '../cart-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  Username: any;
  showform: boolean=false;
  address:any
  selectedOption = 'enabled';
  email:any
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
    this.cartItems = this.cartService.cartItems;
   
  }


  logout(){
    localStorage.clear()
    this.router.navigate(['/landing']);
  }


  opensubmit(){
    this.showform=true;
  }

  submitForm(){
    this.cartItems = this.cartItems.map(item => {
      const { image, ...rest } = item; // Destructure the object to remove 'image'
      return rest; // Return the modified object without 'image'
    });
const formdata={
  name:this.email,
  address:this.address,
  products:this.cartItems,
  totalamount:this.cartService.getTotalAmount()
}
this.http.post<any>('http://localhost:3000/api/users/placeorder', formdata)
.subscribe(
  response => {
    console.log('login successful:', response);
    // this.loginData = { // Clear the signupData object 
    //   email: '',
    //   password: ''
    // };
   
    alert('Your Order Placed')
  
    this.router.navigate(['/myorders']);
  },
  error => {
    if (error.status === 401) {
      alert('Something went wrong, Contact Admin');
    }
    if (error.status === 404){
      alert('Something went wrong, Contact Admin');
    }
    }
    // Handle error
  );
};
  
}
