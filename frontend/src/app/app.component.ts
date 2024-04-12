// app.component.ts
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'farmhand';
constructor(private snackBar: MatSnackBar){}

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000, // Duration in milliseconds (2 seconds in this example)
  });
}
}
