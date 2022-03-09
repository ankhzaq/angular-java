import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { listImports } from '../../app.module';
import { DebugElement, Injectable } from '@angular/core';

import { StudentService } from '../../service/student.service';
import { StudentsComponent } from './students.component';
import { Observable, of, throwError } from 'rxjs';
import { mockupResponseAGGrid, mockupResponseStudents, mockupStudent } from '../../../helpers/constants';
import { HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataState } from '../../enum/data.state.enum';

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let httpMock: HttpTestingController;

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
      imports: [...listImports, HttpClientTestingModule],
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
    httpMock = TestBed.inject(HttpTestingController);
  }));

  it('check mockup students service', () => {
    fixture.detectChanges();
    component.appState$.subscribe((info) => {
      expect(info.dataState).not.toBe(DataState.LOADED_STATE);
    });
  });
});

describe('Students Component - check buttons', () => {

  let fixture: ComponentFixture<StudentsComponent>;
  let compiled: any;
  let component: StudentsComponent;
  let el: DebugElement;


  beforeEach(waitForAsync(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      imports: [...listImports, HttpClientTestingModule],
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
    httpMock = TestBed.inject(HttpTestingController);
  }));

  it('add new row', () => {
    spyOn(component, 'save');
    const buttonAdd = el.query(By.css('#students-btn-add'));
    buttonAdd.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.save).toHaveBeenCalled();
  });

  it('delete new row', () => {

    spyOn(component, 'delete');
    fixture.detectChanges();
    const buttonDelete = el.query(By.css('#students-btn-delete'));
    buttonDelete.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.delete).toHaveBeenCalled();
    expect(buttonDelete.properties.disabled).toBeTruthy();
    component.selectedData$ = mockupStudent;
    fixture.detectChanges();
    expect(buttonDelete.properties.disabled).toBeFalsy();
    component.selectedData$ = null;
    fixture.detectChanges();
    expect(buttonDelete.properties.disabled).toBeTruthy();
  });
});
