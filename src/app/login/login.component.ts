import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../models/dtos';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  invalidCredentials: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {

      const user: UserModel = {
        userName: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.authService.login(user).subscribe({
        next: (response:any) => {
          this.router.navigate(['/user/profile']);
        },
        error: (error:any) => {
          if(error.status === 403){
            this.invalidCredentials = true;
          }
        }
      })
    }
    }
  }

