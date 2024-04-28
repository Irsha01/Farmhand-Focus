import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart-service';
import { Product } from '../product.model';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent implements OnInit {
Username:any
  products: Product[] = [];
  constructor(private http:HttpClient, private router:Router,public cartService: CartService){
    const userdetail = localStorage.getItem('userdetail')
    if (userdetail) {
      // Parse JSON string into object
      const userdetails = JSON.parse(userdetail);
     this.Username=userdetails.username
      // Now you can use the userdetails object
      console.log(userdetails);
    }
  }


ngOnInit(): void {
    this.getProducts();
}
logout(){
  localStorage.clear()
  this.router.navigate(['/landing']);
}


editproduct(Product:any){
  console.log('productdetail',Product)
  this.router.navigate(['/addproduct'], { queryParams: { productId: Product._id } });
}

  getProducts() {
   
    console.log('hello')


    this.http.get<any>('http://localhost:3000/api/users/getproducts')
    .subscribe(
      response => {
        console.log('Signup successful:', response);
        this.products=response;
       // this.router.navigate(['products']);
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

  showAlert(product:any) {
    // Display a confirmation dialog
    var result = window.confirm("Are you sure you want to proceed?");

    // Check the user's choice
    if (result) {
        // User clicked OK
        this.delete(product);
    } else {
        // User clicked Cancel
       
    }
}
  delete(product:any){
    const productid=product._id;
    this.http.delete<any>(`http://localhost:3000/api/users/deleteproduct/${productid}`)
    .subscribe(
      response => {
        console.log('Signup successful:', response);
        this.products=response;
        alert(response.message);
      // this.router.navigate(['products']);
      this.getProducts()
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

  addToCart(product: Product){
   console.log('product',product)
      this.cartService.addToCart(product);
    
  }
}
