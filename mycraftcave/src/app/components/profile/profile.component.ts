import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {}
  isAuthenticated = false;
  profileDetail: any = {};
  ngOnInit(): void {
    this.authService.isAuthenticatedUser.subscribe((res) => {
      this.isAuthenticated = res;
    });

    this.isAuthenticated = this.authService.isAuthenticated();
    const username = this.route.snapshot.params['username'];
    this.getProfile(username);
  }

  getProfile(username: string) {
    this.authService.getProfileByUsername(username).subscribe((res) => {
      this.profileDetail = res.user;
      console.log(this.profileDetail);

    });
  }
}
