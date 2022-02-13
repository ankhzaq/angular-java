import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { SelectComponent } from './components/select/select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from './components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogContent, EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { StudentsComponent } from './screens/students/students.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '**', component: StudentsComponent },
];

export const listImports = [
  MatInputModule,
  MatFormFieldModule,
  AgGridModule.withComponents([]),
  BrowserAnimationsModule,
  BrowserModule,
  HttpClientModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatSelectModule,
  MatToolbarModule,
  ReactiveFormsModule,
  MatSliderModule,
  MatGridListModule,
  RouterModule.forRoot(routes)
];

export const listDeclarations = [
  AppComponent,
  ButtonComponent,
  SelectComponent,
  InputNumberComponent,
  ButtonComponent,
  EditDialogComponent,
  DialogContent,
  LoginComponent,
  StudentsComponent
];

@NgModule({
  declarations: listDeclarations,
  imports: listImports,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
