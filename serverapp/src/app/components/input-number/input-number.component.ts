import { Component } from '@angular/core';
import { ICellRendererParams } from '@ag-grid-community/all-modules';
import { AgRendererComponent } from '@ag-grid-community/angular';

export const ID_FOR_TEST_PREFIX = 'aggrid-inputnumber-';
export const ID_FOR_TEST = '194';

@Component({
  selector: 'app-input-number',
  template: `<input id="{{ idForTest}}" matInput [value]="value" type="number" (change)="inputValueUpdated($event)" style="width: 40px" />`,
})
export class InputNumberComponent implements AgRendererComponent {
  public idForTest: string | number = `${ID_FOR_TEST_PREFIX}${ID_FOR_TEST}`;
  public agGridParams;
  value: string;
  private field: string;

  inputValueUpdated(selectElem) {
    const newValue = selectElem.target.value;
    this.agGridParams.setValue(Number(newValue));
  }

  agInit(params: ICellRendererParams): void {
    if (params) {
      this.agGridParams = params;
      const { colDef: { field }, data: { id }, value } = params;
      this.idForTest = `${ID_FOR_TEST_PREFIX}${id}`;
      this.field = field;
      this.value = value;
    }
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
