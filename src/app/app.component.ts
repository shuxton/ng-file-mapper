import { Component } from '@angular/core';
import { LabelsConfig } from './ng-file-mapper/ng-file-mapper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  labelsConfig: LabelsConfig = {
    availableColumns: 'Our fields',
  };
  availableColumns = [
    {
      name: 'Sales',
      columns: [
        { name: 'Invoice Number', defaultValue: null, dataType: 'string' },
        { name: 'Issue Date', defaultValue: null, dataType: 'dateTime' },
      ],
    },
    {
      name: 'Credit',
      columns: [
        { name: 'Credit Note Number', defaultValue: null, dataType: 'string' },
        { name: 'Issue Date', defaultValue: null, dataType: 'dateTime' },
      ],
    },
  ];

  getMappings(output: any) {
    console.log(output);
  }
}
