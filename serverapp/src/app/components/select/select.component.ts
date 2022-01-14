import { Component } from '@angular/core';
import { AgRendererComponent } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/all-modules';
import { Levels } from '../../enum/levels.enum';
import { isPreplyOptions } from '../../../helpers/constants';

@Component({
  selector: 'app-select',
  template: `
    <mat-select [(value)]="value" (selectionChange)="selectValueUpdated($event)">
      <mat-option *ngFor="let option of this.options" [value]="option">
        {{option}}
      </mat-option>
    </mat-select>
  `
})

export class SelectComponent implements AgRendererComponent {
  private agGridParams: any;
  value: string;
  private field: string;
  options: string[];
  private optionsFields = {
    isPreply: isPreplyOptions,
    level:  Object.values(Levels)
  };

  selectValueUpdated(selectElem) {
    this.agGridParams.setValue(selectElem.value);
  }

  agInit(params: ICellRendererParams): void {
    this.agGridParams = params;
    const { colDef: { field }, value } = params;
    this.field = field;
    this.value = value;
    this.options = this.optionsFields[field];
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
