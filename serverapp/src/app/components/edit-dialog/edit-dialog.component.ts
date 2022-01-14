import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Student } from '../../interface/student';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isPreplyOptions } from '../../../helpers/constants';
import { Levels } from '../../enum/levels.enum';

@Component({
  selector: 'app-edit-dialog',
  template: '',
})
export class EditDialogComponent implements OnInit {
  @Input() selectedData: Student;
  @Output() onCloseDialog = new EventEmitter<any>();

  form: FormGroup;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const fields = Object.keys(this.selectedData);
    const fieldsForm = {};
    fields.forEach((field) => {
      fieldsForm[field] = this.formBuilder.control(this.selectedData[field]);
    });
    this.form = this.formBuilder.group(fieldsForm);
    const dialogRef = this.dialog.open(DialogContent, {
      data: this.form,
      width: '90%',
      height: '90%'
    });
    dialogRef.afterClosed().subscribe(form => {
      this.onCloseDialog.emit(form ? form.value : null);
    });
  }
}

@Component({
  selector: 'dialog-content',
  templateUrl: 'edit-dialog.component.html',
})
export class DialogContent {

  options = isPreplyOptions;
  levels = Object.keys(Levels);

  constructor(@Inject(MAT_DIALOG_DATA) public data: FormGroup) {
  }
}
