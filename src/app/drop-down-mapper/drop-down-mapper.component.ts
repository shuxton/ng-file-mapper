import { Component, Input } from '@angular/core';
import { MapperService } from '../mapper.service';
import { LabelsConfig } from '../ng-file-mapper/ng-file-mapper.type';

@Component({
  selector: 'app-drop-down-mapper',
  templateUrl: './drop-down-mapper.component.html',
  styleUrls: ['./drop-down-mapper.component.css'],
})
export class DropDownMapperComponent {
  @Input() availableColumns: any[] = [];
  @Input() labelsConfig:LabelsConfig={}
  headerRow:string[]=[]
  previewRow:string[]=[]
  uploadedFields:string[]=[]
  fieldForMapping:string=''

  constructor(private _mapperService: MapperService) {}

  ngOnInit(): void {
    this._mapperService.parsedData$.subscribe((e) => {
      this.headerRow = e.headerRow;
      this.previewRow = e.previewRow;
      this.uploadedFields = [this.headerRow[0]];
      this.fieldForMapping = this.availableColumns[0]?.columns[0]?.name;
    });
  }
}
