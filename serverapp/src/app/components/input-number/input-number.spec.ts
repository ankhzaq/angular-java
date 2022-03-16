import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { DebugElement } from '@angular/core';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ID_FOR_TEST, ID_FOR_TEST_PREFIX, InputNumberComponent } from './input-number.component';

describe('input number component', () => {

  let fixture: ComponentFixture<InputNumberComponent>;
  let compiled: any;
  let component: InputNumberComponent;
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
        fixture = TestBed.createComponent(InputNumberComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        compiled = fixture.debugElement.nativeElement;
        fixture.detectChanges();
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should appear an input field', () => {
    const inputElement = compiled.querySelector('input');
    expect(inputElement).toBeTruthy();
    expect(inputElement.getAttribute('id')).toEqual(`${ID_FOR_TEST_PREFIX}${ID_FOR_TEST}`);
  });

});
