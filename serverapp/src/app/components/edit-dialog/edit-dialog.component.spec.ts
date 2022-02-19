import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { DebugElement } from '@angular/core';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EditDialogComponent } from './edit-dialog.component';
import { mockupStudent } from '../../../helpers/constants';

describe('Edit dialog component', () => {

  let fixture: ComponentFixture<EditDialogComponent>;
  let compiled: any;
  let component: EditDialogComponent;
  let el: DebugElement;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        NoopAnimationsModule
      ],
      providers: []
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EditDialogComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        compiled = fixture.debugElement.nativeElement;
        fixture.detectChanges();
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('check initial data', () => {
    fixture.detectChanges();

    component.data = mockupStudent;
    fixture.detectChanges();

    Object.keys(mockupStudent).forEach((key) => {
      const valueMockup = mockupStudent[key];
      const valueForm = component.form.controls[key].value;
      expect(valueForm).toBe(valueMockup);
    });
    expect(component.form.valid).toBeTruthy();
  });
});
