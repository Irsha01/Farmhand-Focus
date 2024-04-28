import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent implements OnInit {
  product = {
    name: '',
    image: '',
    price: '',
    description: '',
    id:''
  };
  productId:number=0
Username:any
update=0
   constructor(private http:HttpClient, private router:Router, private route: ActivatedRoute){
   
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
    this.route.queryParams.subscribe(params => {
      this.productId = params['productId'];
      // Use the productId here as needed
    });
    if (this.productId){
      this.getproduct();
      
    } 
   }
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



  logout(){
    localStorage.clear()
    this.router.navigate(['/landing']);
  }

  onSubmit() {
    // Send the product data to the backend or perform any other actions here
    console.log('Product added:', this.product);
    
    // Clear the form after submission
    this.product = {
      name: this.product.name,
      image: this.product.image,
      price: this.product.price,
      description: this.product.description,
      id:''
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



  getproduct(){
    this.update=1;
    this.http.post<any>('http://localhost:3000/api/users/editproduct', {productID:this.productId})
    .subscribe(
      response => {
        console.log('prdocutdata fetched:', response);
       // alert(response.message);
        //this.products=response
        this.product = {
          name:  response.name,
          price:  response.price,
          description:  response.description,
          image:  '',
          id: response._id
        };
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


  UpdateProduct(){
    this.http.post<any>('http://localhost:3000/api/users/updateproduct', {product:this.product})
    .subscribe(
      response => {
        console.log('prdocutdata fetched:', response);
       // alert(response.message);
        //this.products=response
       
        
         
          alert(response.message);
          this.router.navigate(['products']);
        
      },
      error => {
        if (error.status === 404) {
         
          alert(error.error.message);
          this.router.navigate(['products']);
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
