import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interface/User';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AppState } from '../../interface/app-state';
import { catchError, map, startWith } from 'rxjs/operators';
import { DataState } from '../../enum/data.state.enum';
import { UserService } from 'src/app/service/user.service';
import { CustomResponse } from '../../interface/custom-response';
import { CustomResponseUser } from '../../interface/custom-response-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private dataSubject = new BehaviorSubject<CustomResponseUser>(null);
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  navigateToMainPage(): void {
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    const formFields = {
      username: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    };
    this.form = this.formBuilder.group(formFields);
  }

  registerUser(): void {
    console.log("value: ", this.form.getRawValue());
    this.userService.save$(this.form.getRawValue()).pipe(map(response => {
      this.dataSubject.next({ ...response });
      return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value };
    }), catchError((error: string) => {
      debugger;
      return of({ dataState: DataState.ERROR_STATE, error });
    }));
  }

}
