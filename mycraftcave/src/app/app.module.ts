import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { AccountSettingComponent } from './components/account-setting/account-setting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { CreateUsernameComponent } from './components/create-username/create-username.component';
import { CustomHttpInterceptor } from './auth.intercpetor';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    AccountSettingComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    CreateUsernameComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatMenuModule,
    NgxSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    AuthModule.forRoot(environment.auth),
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:CustomHttpInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
