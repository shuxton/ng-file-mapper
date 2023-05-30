import { Component, Input } from '@angular/core';
import { MapperService } from '../../mapper.service';
import { MappedFields } from '../drop-down-mapper.type';
import { LabelsConfig } from 'src/app/ng-file-mapper/ng-file-mapper.type';
import {l} from '../utils/labelResolver'
@Component({
  selector: 'drop-down-mapper-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css'],
})
export class ColumnsComponent {
  selectedColumnConfig: number = 0;
  @Input() uploadedFields: string[] = [];
  @Input() fieldForMapping: string = '';
  mappings: MappedFields[] = [];
  @Input()   previewRow: string[] = [];
  @Input()   headerRow: string[] = [];
  @Input() availableColumns: any[] = [];
  @Input() labelsConfig:LabelsConfig={}


  constructor(private _mapperService: MapperService) {}

  ngOnInit(): void {
    this._mapperService.mappedData$.subscribe((e) => {
      this.mappings = e;
    });
    l("hello","world")
  }

  handleMappedField() {
    const index = this.mappings.findIndex(
      (a: any) => a.fieldForMapping == this.fieldForMapping
    );
    if (index == -1) return;
    this.mappings.splice(index,1);
    this._mapperService.addMappedData(this.mappings)
  }

  mapFields() {
    this.handleMappedField();
    const fieldForMappingIndex = this.availableColumns[
      this.selectedColumnConfig
    ]?.columns?.findIndex((a: any) => a.name == this.fieldForMapping);
    const fieldForMappingDetails =
      this.availableColumns[this.selectedColumnConfig]?.columns[fieldForMappingIndex];
    console.log(this.uploadedFields);
    let mappedFields: MappedFields = {
      uploadedFields: this.uploadedFields,
      fieldForMapping: this.fieldForMapping,
      defaultValue: fieldForMappingDetails?.defaultValue,
      transform: [],
      dataType: fieldForMappingDetails?.dataType,
      combination: this.uploadedFields,
    };
    this.mappings.push(mappedFields)
    this._mapperService.addMappedData(this.mappings)
  }
}
