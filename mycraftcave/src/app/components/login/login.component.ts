import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((res) => {
      console.log(res);
    });
    this.loginForm = new FormGroup({
      user_name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  async onLogin() {
    this.authService.loginUser(this.loginForm.value).subscribe(
      (res) => {
        this.authService.setToken(res.token);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  getUserDetail() {
    this.auth.user$.subscribe((res: any) => {
      const obj = { email: res.email, name: res.name };
      this.authService.loginUserForSSo(obj).subscribe((res) => {
        this.authService.setToken(res.token);
        if (res.userName !== '') {
          this.router.navigate([`/profile/${res.userName}`]);
        } else {
          this.router.navigate([`/create-username`]);
        }
      });
    });
  }

  loginWithGoogle(): void {
    this.auth.loginWithPopup().subscribe(
      (res) => {
        this.getUserDetail();
      },
      (err) => {
        // this.toastr.error('Login Failed');
      }
    );
  }
}
