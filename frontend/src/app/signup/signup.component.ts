import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-signup',
 
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  signupData = {
    username: '',
    email: '',
    password: ''
  };
  constructor(private http: HttpClient) { }
  onSubmit() {
    const formData = {
      username: this.signupData.username,
      email: this.signupData.email  ,
      password: this.signupData.password
    };
  
    this.http.post<any>('http://localhost:3000/api/users/signup', formData)
      .subscribe(
        response => {
          console.log('Signup successful:', response);
          this.signupData = { // Clear the signupData object
            username: '',
            email: '',
            password: ''
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

}
