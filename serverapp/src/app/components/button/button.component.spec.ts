import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import {DebugElement} from '@angular/core';

import { UserService } from '../../service/user.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ButtonComponent } from './button.component';




describe('Button Component', () => {

  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;
  let el: DebugElement;
  let userService: any;


  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [
        AppModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: UserService, useValue: UserService}
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        userService = TestBed.get(UserService);
      });

  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
