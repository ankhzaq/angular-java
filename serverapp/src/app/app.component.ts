import { Component, OnInit } from '@angular/core';
import { AppState } from './interface/app-state';
import { CustomResponse } from './interface/custom-response';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { DataState } from './enum/data.state.enum';
import { Server } from './interface/server';
import { StudentService } from './service/student.service';
import { Student } from './interface/student';
import { Levels } from './enum/levels.enum';
import { SelectComponent } from './components/select/select.component';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { ButtonComponent } from './components/button/button.component';
import { CustomResponseAGGrid } from './interface/custom-response-aggrid';
import { AGGrid } from './interface/aggrid';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent { }
