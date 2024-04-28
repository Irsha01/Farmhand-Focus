import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  // loginData = {
  //   email: '',
  //   password: ''
  // };
  
  constructor(private http: HttpClient, private router:Router, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    }); 
  }
  onSubmit() {
    
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
    this.http.post<any>('http://localhost:3000/api/users/login', formData)
      .subscribe(
        response => {
          console.log('login successful:', response);
          // this.loginData = { // Clear the signupData object 
          //   email: '',
          //   password: ''
          // };
          const user=response.user;
          console.log('userdetail',user)
          localStorage.setItem('userdetail',JSON.stringify(user))
          alert('Login Successfully')
        
          this.router.navigate(['/dashboard']);
        },
        error => {
          if (error.status === 401) {
            alert('Invalid Username or Password');
          }
          if (error.status === 404) {
            alert('Invalid Username or Password');
          }
          // Handle error
        }
      );
  }
  else{
    alert('Please fill the details')
  }
}
 
}
