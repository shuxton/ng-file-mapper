import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapperService } from '../../mapper.service';
import { MappedFields, Operation, Transform } from '../drop-down-mapper.type';
import { transformOperation } from '../utils/operations';

@Component({
  selector: 'mapping-table',
  templateUrl: './mapping-table.component.html',
  styleUrls: ['./mapping-table.component.css'],
})
export class MappingTableComponent {
  @Input() previewRow: any[] = [];
  @Input() headerRow: any[] = [];

  mappings: MappedFields[] = [];
  editMapping: MappedFields | null = null;
  transform: Transform[] = [];
  displayStyle = 'none';
  displayStyleCombination = 'none';
  combination: string[] = [];
  previewData: any[] = [];

  constructor(private _mapperService: MapperService) {}

  ngOnInit(): void {
    this._mapperService.mappedData$.subscribe((e) => {
      this.mappings = e;
      this.getPreview();
    });
  }

  editCombinations(mapping: MappedFields, index: number) {
    this.editMapping = JSON.parse(JSON.stringify(mapping));
    this.editMapping!['index'] = index;
    this.editMapping!['activeField'] = this.editMapping?.uploadedFields[0];
    this.displayStyleCombination = 'block';
    this.combination = this.editMapping?.combination || [];
  }

  editMappings(mapping: MappedFields, index: number, field: string) {
    this.editMapping = JSON.parse(JSON.stringify(mapping));
    this.editMapping!['index'] = index;
    this.editMapping!['activeField'] = field;
    this.transform = this.editMapping?.transform || [];
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
    this.displayStyleCombination = 'none';
  }

  getPreview() {
    this.previewData=[]
    this.mappings.forEach((val, i) => {
      this.combination = val.combination;
      this.transform = val.transform;
      val.uploadedFields.forEach((field, index) => {
        this.applyTranformationOnField(field);
      });
      this.previewData.push({
        field: val.fieldForMapping,
        value: this.getPreviewData(),
      });
    });
  }

  getPreviewData() {
    let output = '';
    this.combination.forEach((c) => {
      let t = this.transform
        .filter((a) => a.field == c)
        .sort((a, b) => b.stepNum - a.stepNum);
      if (t.length > 0) output += t[0].output;
      else {
        let i = this.headerRow.findIndex((a) => a == c.trim());
        if (i != -1) output += this.previewRow[i];
      }
      console.log(output);
    });
    return output;
  }

  applyTranformationOnField(field: string) {
    let previousOutput: any =
      this.previewRow[this.headerRow.findIndex((a) => a == field)];
    for (var i = 0; i < this.transform.length; i++) {
      if (this.transform[i].field != field) continue;
      let newArgsList = this.transform[i].args.map((val, key) => {
        let i = this.headerRow.findIndex((a) => a == val.trim());
        if (i == -1) return val;
        else return this.previewRow[i];
      });
      previousOutput = transformOperation(
        previousOutput,
        newArgsList,
        this.transform[i].operation
      );
      this.transform[i].output = previousOutput;
    }

    return previousOutput;
  }
}
