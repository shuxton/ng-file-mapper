import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  availableColumns = [
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

  getMappings(event:any){
     console.log(event)
  }
}
