import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-create-username',
  templateUrl: './create-username.component.html',
  styleUrls: ['./create-username.component.scss'],
})
export class CreateUsernameComponent implements OnInit {
  results$!: Observable<any>;
  createUsername: boolean = false;
  subject = new Subject();
  profile: any = {};
  searchText = '';
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.results$ = this.subject.pipe(
      debounceTime(300), // Delay the API call by 300ms
      distinctUntilChanged(),
      map((searchText) => {
        this.authService.checkUserName(searchText).subscribe((res: any) => {
          if (res.userExist === null) {
            this.createUsername = true;
          } else {
            this.createUsername = false;
            // this.toastr.warning('UserName Already Exist')
          }
        });
      })
    );
    this.results$.subscribe(res=>{
      console.log(res);

    })
  }
  searchApi(): any {
    this.profile = this.authService.getProfile();
    this.subject.next(this.searchText);
  }

  createUser() {
    this.authService
      .createUserName(this.profile.userId, this.searchText)
      .subscribe(
        (res) => {
          this.router.navigate([`/${this.searchText}`]);
        },
        (err) => {}
      );
  }
}
