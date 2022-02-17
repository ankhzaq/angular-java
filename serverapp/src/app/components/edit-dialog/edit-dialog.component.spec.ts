import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { DebugElement } from '@angular/core';

import { UserService } from '../../service/user.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EditDialogComponent } from './edit-dialog.component';
import { Student } from 'app/interface/student';
import { Levels } from '../../enum/levels.enum';
import { By } from '@angular/platform-browser';

describe('Edit dialog component', () => {

  let fixture: ComponentFixture<EditDialogComponent>;
  let component: EditDialogComponent;
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
        fixture = TestBed.createComponent(EditDialogComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        userService = TestBed.get(UserService);
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('check initial data', () => {
    fixture.detectChanges();

    expect(component.form.valid).toBeFalsy();

    /*const mockupData: Student = {
      name: 'nameStudent',
      isPreply: true,
      level: Levels.A1,
      progressInfo: 'progress mockup',
      objectivesInfo: 'objectives mockup',
      nextClassInfo: 'nextClass mockup',
      hobbiesInfo: 'hobbies mockup',
      numPaidClasses: 3
    };

    component.selectedData = mockupData;
    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();
    const name = component.form.controls.name;
    console.log(name);
    // expect(name.getText()).toBe('nameStudent');
    expect(component).toBeTruthy();*/
  });
});
