import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-file-mapper',
  templateUrl: './ng-file-mapper.component.html',
  styleUrls: ['./ng-file-mapper.component.css'],
})
export class NgFileMapperComponent {
 @Input() availableColumns = [
    {
      name: 'Sales',
      columns: [
        { name: 'Invoice Number', defaultValue: null,dataType:'string' },
        { name: 'Issue Date', defaultValue: null,dataType:'dateTime' },
      ],
    },
    {
      name: 'Credit',
      columns: [
        { name: 'Credit Note Number', defaultValue: null ,dataType:'string'},
        { name: 'Issue Date', defaultValue: null ,dataType:'dateTime'},
      ],
    },
  ];
  title = 'ng-file-mapper';
}
