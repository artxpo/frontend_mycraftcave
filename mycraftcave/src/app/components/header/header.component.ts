import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAuthenticated = false;
  profile: any = {};
  constructor(private authService: AuthenticationService,private auth:AuthService,private router:Router) {}
  ngOnInit() {
    this.authService.isAuthenticatedUser.subscribe((res) => {
      this.isAuthenticated = res;
    });

    this.isAuthenticated = this.authService.isAuthenticated();
    this.profile = this.authService.getProfile();
    console.log(this.profile);

  }

  getUserDetail() {
    this.auth.user$.subscribe((res: any) => {
      const obj = { email: res.email, name: res.name };
      this.authService.loginUserForSSo(obj).subscribe((res) => {
        this.authService.setToken(res.token);
        if (res.userName !== '') {
          this.profile = this.authService.getProfile();
          this.router.navigate([`/${res.userName}`]);
        } else {
          this.router.navigate([`/create-username`]);
        }
      });
    });
  }

  logout() {
    this.authService.logout();
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
