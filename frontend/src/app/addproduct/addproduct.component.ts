import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
  product = {
    name: '',
    image: '',
    price: 0
  };

   constructor(private http:HttpClient, private router:Router){}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.product.image = reader.result as string;
      };
    }
  }

  onSubmit() {
    // Send the product data to the backend or perform any other actions here
    console.log('Product added:', this.product);
    
    // Clear the form after submission
    this.product = {
      name: this.product.name,
      image: this.product.image,
      price: this.product.price
    };


    this.http.post<any>('http://localhost:3000/api/users/products', this.product)
    .subscribe(
      response => {
        console.log('Signup successful:', response);
        alert(response.message);
        this.router.navigate(['products']);
      },
      error => {
        if (error.status === 404) {
         
          alert(error.error.message);
        }
        if (error.status === 401) {
          alert(error.error.message);
        }
        console.error('Error signing up:', error);
        // Handle error
      }
    );

  }
}
