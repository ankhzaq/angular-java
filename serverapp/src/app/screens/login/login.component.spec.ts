import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { listImports } from '../../app.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { UserService } from '../../service/user.service';
import { LoginComponent } from './login.component';

describe('Login Component', () => {

  let fixture: ComponentFixture<LoginComponent>;
  let compiled: any;
  let component: LoginComponent;
  let el: DebugElement;
  let userService: any;


  beforeEach(waitForAsync(() => {

    const userServiceSpy = jasmine.createSpyObj('UserService', ['findAllCourses']);

    TestBed.configureTestingModule({
      imports: listImports,
      providers: [
        { provide: UserService, useValue: UserService }
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        compiled = fixture.debugElement.nativeElement;
        userService = TestBed.get(UserService);
      });

  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('change login/register form ', () => {

    fixture.detectChanges();

    expect(el.query(By.css('input[formcontrolname="email"]'))).toBeTruthy();
    expect(el.query(By.css('input[formcontrolname="password"]'))).toBeTruthy();
    expect(el.query(By.css('input[formcontrolname="username"]'))).toBeFalsy();

    expect(compiled.querySelector('button')).toBeTruthy();

    const buttons = fixture.debugElement.queryAll(By.css('button'));

    const [, registerBtn, loginBtn] = buttons;

    expect(loginBtn.nativeElement.getAttribute('ng-reflect-color')).toEqual('accent');

    registerBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(registerBtn.nativeElement.getAttribute('ng-reflect-color')).toEqual('accent');
    expect(loginBtn.nativeElement.getAttribute('ng-reflect-color')).toEqual(null);
    expect(el.query(By.css('input[formcontrolname="username"]'))).toBeTruthy();

    loginBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(loginBtn.nativeElement.getAttribute('ng-reflect-color')).toEqual('accent');
    expect(registerBtn.nativeElement.getAttribute('ng-reflect-color')).toEqual(null);
    expect(el.query(By.css('input[formcontrolname="username"]'))).toBeFalsy();
  });

  it('goBack btn ', () => {
    spyOn(component, 'navigateToMainPage');
    fixture.detectChanges();

    expect(el.query(By.css('input[formcontrolname="email"]'))).toBeTruthy();
    expect(el.query(By.css('input[formcontrolname="password"]'))).toBeTruthy();
    expect(el.query(By.css('input[formcontrolname="username"]'))).toBeFalsy();

    expect(compiled.querySelector('button')).toBeTruthy();

    const buttons = fixture.debugElement.queryAll(By.css('button'));

    const [backBtn] = buttons;

    backBtn.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.navigateToMainPage).toHaveBeenCalled();
  });
});
