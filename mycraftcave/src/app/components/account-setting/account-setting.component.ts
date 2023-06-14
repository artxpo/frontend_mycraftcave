import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss'],
})
export class AccountSettingComponent {
  profileDetail: any = {};
  profile: any = {};
  @Input() userName: string = '';
  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profile = this.authService.getProfile();
    this.getProfileDetail();
  }

  getProfileDetail() {
    this.authService.getProfileDetail(this.profile).subscribe((res) => {
      this.profileDetail = res.user;
      console.log(this.profileDetail);

    });
  }
}
