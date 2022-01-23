import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interface/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from '../../interface/app-state';
import { UserService } from 'src/app/service/user.service';
import { CustomResponseUser } from '../../interface/custom-response-user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorLoginRegister: Boolean = false;
  form: FormGroup;
  loginMode: Boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private http: HttpClient) { }

  changeForm(): void {
    if (this.errorLoginRegister) this.errorLoginRegister = false;
  }

  navigateToMainPage(): void {
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    const formFields = {
      username: ['user', Validators.required],
      email: ['user@gmail.com', [Validators.required, Validators.email]],
      password: ['pass', Validators.required]
    };
    this.form = this.formBuilder.group(formFields);
  }

  loginUser(): void {
    if (!this.loginMode) {
      this.loginMode = true;
    } else {
      const { email, password } = this.form.getRawValue();
      this.userService.findUserByEmail$(email, password).subscribe(result => {
        this.navigateToMainPage();
      }, (response) => {
        this.errorLoginRegister = true;
        // there has been an error.
      });
    }
  }

  registerUser(): void {
    if (this.loginMode) {
      this.loginMode = false;
    } else {
      const newUser: User = this.form.getRawValue();
      this.userService.save$(newUser).subscribe(result => {
        const { statusCode } = result;
        if (statusCode === 201) {
          this.navigateToMainPage();
        }
      }, (response) => {
        this.errorLoginRegister = true;
        // there has been an error.
      });
    }
  }
}
