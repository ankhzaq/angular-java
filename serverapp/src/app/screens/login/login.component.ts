import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interface/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AppState } from '../../interface/app-state';
import { catchError, map, startWith } from 'rxjs/operators';
import { DataState } from '../../enum/data.state.enum';
import { UserService } from 'src/app/service/user.service';
import { CustomResponseUser } from '../../interface/custom-response-user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private dataSubject = new BehaviorSubject<CustomResponseUser>(null);
  userInfo$: Observable<AppState<CustomResponseUser>>;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private http: HttpClient) { }

  navigateToMainPage(): void {
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    const formFields = {
      username: this.formBuilder.control('user'),
      email: this.formBuilder.control('user@gmail.com'),
      password: this.formBuilder.control('pass')
    };
    this.form = this.formBuilder.group(formFields);
  }

  registerUser(): void {
    const newUser: User = this.form.getRawValue();
    this.userService.save$(newUser).subscribe(result => {
      const { statusCode } = result;
      if (statusCode === 201) {
        // user registered
      }
    }, (response) => {
      // there has been an error.
    });
  }
}
