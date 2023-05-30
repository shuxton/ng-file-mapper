# ng-file-mapper
### _File Mapping Component for Angular_

## Contribute
[https://github.com/shuxton/ng-file-mapper](https://github.com/shuxton/ng-file-mapper)

## Features

- Import a CSV/XSLX file
- Map the fields to your model
- Transform the mapped data
- Combine the fields in many to one mappings
- Export the mapped data

## To-Do

- Develop utility functions to work with final output
- Provide more customizable UI

## Installation

```sh
npm i @shuxton/ng-file-mapper
```

## Example 

#### Using the Component
*.module.ts
```
import { NgFileMapperModule } from '@shuxton/ng-file-mapper';

@NgModule({
  ...
  imports: [
    ...
    NgFileMapperModule,
    ...
  ]})
```
*.component.html
```
<ng-file-mapper
  (getMappings)="getMappings($event)"
  [availableColumns]="availableColumns"
  [labelsConfig]="labelsConfig"
></ng-file-mapper>
```

*.component.ts
```
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
```

#### Output
```
[
    {
        "uploadedFields": [
            "Invoice Type",
            "Invoice Number *"
        ],
        "fieldForMapping": "Invoice Number",
        "defaultValue": null,
        "transform": [
            {
                "field": "Invoice Number *",
                "operation": "concat",
                "args": [
                    "-"
                ],
                "stepNum": 0,
                "output": "20900-"
            }
        ],
        "dataType": "string",
        "combination": [
            "Invoice Number *",
            "Invoice Type"
        ]
    },
    {
        "uploadedFields": [
            "Invoice Issue Date*"
        ],
        "fieldForMapping": "Issue Date",
        "defaultValue": null,
        "transform": [],
        "dataType": "dateTime",
        "combination": [
            "Invoice Issue Date*"
        ]
    }
]
```