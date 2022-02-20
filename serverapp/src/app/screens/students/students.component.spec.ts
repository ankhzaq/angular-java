import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { listImports } from '../../app.module';
import { DebugElement, Injectable } from '@angular/core';

import { StudentService } from '../../service/student.service';
import { StudentsComponent } from './students.component';
import { of, throwError } from 'rxjs';
import { mockupResponseAGGrid, mockupResponseStudents } from '../../../helpers/constants';
import { DataState } from '../../enum/data.state.enum';
import { HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

let httpClientSpy: jasmine.SpyObj<HttpClient>;

class ProviderMock {

  constructor() {}

  public students$ = of(mockupResponseStudents);
  public agGridInfo$ = of(mockupResponseAGGrid);
}

class ProviderMockError {

  constructor() {}

  public students$ =  throwError(() => new Error('error students service for test'));
  public agGridInfo$ = throwError(() => new Error('error agGridInfo service for test'));
}

// fdescribe to execute only one test
describe('Students Component', () => {

  let fixture: ComponentFixture<StudentsComponent>;
  let compiled: any;
  let component: StudentsComponent;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: listImports,
      providers: [
        {
          provide: StudentService,
          useClass: ProviderMock,
        },
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(StudentsComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        compiled = fixture.debugElement.nativeElement;
        fixture.detectChanges();
      });
    TestBed.inject(StudentService);
  }));


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('check mockup students service', () => {
    fixture.detectChanges();
    component.appState$.subscribe((info) => {
      expect(info.appData.data.students).toBe(mockupResponseStudents.data.students);
    });
  });

  it('check mockup AGGrid service', () => {
    fixture.detectChanges();
    // @ts-ignore
    const listNamesColumns = component.columns$.map((column) => column.field);
    const listNamesColumnsMockups = JSON.parse(mockupResponseAGGrid.data.agGrid.columns).map((column) => column.name);
    expect(JSON.stringify(listNamesColumns)).toBe(JSON.stringify(listNamesColumnsMockups));
  });

  it('check navigation from students page to login', () => {
    spyOn(component, 'navigateToLoginPage');
    fixture.detectChanges();
    const buttonLogin = el.query(By.css('#students-btn-login'));
    buttonLogin.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.navigateToLoginPage).toHaveBeenCalled();
  });
});


describe('Students Component - error service', () => {

  let fixture: ComponentFixture<StudentsComponent>;
  let compiled: any;
  let component: StudentsComponent;
  let el: DebugElement;


  beforeEach(waitForAsync(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: listImports,
      providers: [
        {
          provide: StudentService,
          useClass: ProviderMockError,
        },
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(StudentsComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        compiled = fixture.debugElement.nativeElement;
        fixture.detectChanges();
      });
    TestBed.inject(StudentService);
  }));

  it('check mockup students service', () => {
    fixture.detectChanges();
    component.appState$.subscribe((info) => {
      expect(info.dataState).not.toBe(DataState.LOADED_STATE);
    });
  });
});
