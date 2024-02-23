import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  @ViewChild('passwordInput') passwordInput: ElementRef<any>;

  /**
   * check if submit conditions have been met before sending form
   */
  onSubmit() {
    console.log(`${this.username} the user name `);
    console.log(`${this.password} the password `);
  }

  /**
   *  Toggle the input type between "password" and "text"
   */
  togglePasswordVisibility(input: any) {
    this.showPassword = !this.showPassword;
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
