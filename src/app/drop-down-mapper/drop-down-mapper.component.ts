import { Component, Input } from '@angular/core';
import { MapperService } from '../mapper.service';
import { MappedFields, Operation, Transform } from './drop-down-mapper.type';
import { transformOperation } from './operations/operations';

@Component({
  selector: 'app-drop-down-mapper',
  templateUrl: './drop-down-mapper.component.html',
  styleUrls: ['./drop-down-mapper.component.css'],
})
export class DropDownMapperComponent {
  headerRow: string[] = [];
  selectedColumnConfig: number = 0;
  yourField: string[] = [];
  ourField: string = '';
  mappings: MappedFields[] = [];
  editMapping: MappedFields | null = null;
  transform: Transform[] = [];
  displayStyle = 'none';
  displayStyleCombine = 'none';
  displayStyleMappings = 'none';
  dataToView: string = '';
  operations: Operation[] = [
    { name: 'concat', args: 1 },
    { name: 'multiply', args: 1 },
    { name: 'divide', args: 1 },
    { name: 'add', args: 1 },
    { name: 'format', args: 1 },
    { name: 'substring', args: 2 },
  ];
  selectedOperation: string = '';
  selectedField: string = '';
  argsList: string[] = [];
  previewData: any[] = [];
  previewRow: string[] = [];
  combination: string[] = [];
  @Input() availableColumns: any[] = [];

  constructor(private _mapperService: MapperService) {}

  ngOnInit(): void {
    this._mapperService.parsedData$.subscribe((e) => {
      this.headerRow = e.headerRow;
      this.previewRow = e.previewRow;
      this.yourField = [this.headerRow[0]];
      this.ourField = this.availableColumns[0]?.columns[0]?.name;
    });

    this._mapperService.mappedData$.subscribe((e) => {
      this.mappings = e;
    });
  }

  handleMappedField() {
    const index = this.mappings.findIndex(
      (a: any) => a.ourField == this.ourField
    );
    if (index == -1) return;
    this.mappings?.splice(index, 1);
    this.previewData?.splice(index, 1);
  }

  mapFields() {
    this.handleMappedField();
    const ourFieldIndex = this.availableColumns[
      this.selectedColumnConfig
    ]?.columns?.findIndex((a: any) => a.name == this.ourField);
    const ourFieldDetails =
      this.availableColumns[this.selectedColumnConfig]?.columns[ourFieldIndex];
    console.log(this.yourField);
    let mappedFields: MappedFields = {
      yourField: this.yourField,
      ourField: this.ourField,
      defaultValue: ourFieldDetails?.defaultValue,
      transform: [],
      dataType: ourFieldDetails?.dataType,
      combination: this.yourField,
    };
    this.combination = this.yourField;
    this.mappings.push(mappedFields);
    this.previewData.push({
      field: this.ourField,
      value: this.getPreviewData(),
    });
  }

  closePopup() {
    this.displayStyle = 'none';
    this.displayStyleCombine = 'none';
    this.displayStyleMappings = 'none';
  }

  editCombinations(mapping: MappedFields, index: number) {
    this.editMapping = JSON.parse(JSON.stringify(mapping));
    this.editMapping!['index'] = index;
    this.editMapping!['activeField'] = this.editMapping?.yourField[0];
    this.transform = this.editMapping?.transform || [];
    this.displayStyleCombine = 'block';
    this.combination = this.editMapping?.combination || [];
  }

  editMappings(mapping: MappedFields, index: number, field: string) {
    this.editMapping = JSON.parse(JSON.stringify(mapping));
    this.editMapping!['index'] = index;
    this.editMapping!['activeField'] = field;
    this.transform = this.editMapping?.transform || [];
    this.displayStyle = 'block';
  }

  filterTransformations(value: any): any[] {
    return value.filter((v: any) => v.field == this.editMapping?.activeField);
  }
  filterCombinations(value: any): any[] {
    return value?.filter(
      (v: any) => this.combination.findIndex((a) => a == v) == -1
    );
  }

  deleteCombination(index: number) {
    this.combination.splice(index, 1);
    this.mappings[this.editMapping?.index!].combination = JSON.parse(
      JSON.stringify(this.combination)
    );
    this.previewData[this.editMapping?.index!].value = this.getPreviewData();
  }

  addCombination() {
    this.combination.push(this.editMapping?.activeField!);
    this.mappings[this.editMapping?.index!].combination = JSON.parse(
      JSON.stringify(this.combination)
    );
    this.previewData[this.editMapping?.index!].value = this.getPreviewData();
  }

  setArgsList() {
    let temp: string[] = [];
    for (
      var i = 0;
      i < this.operations?.find((a) => a.name == this.selectedOperation)?.args!;
      i++
    ) {
      temp.push('args' + i);
    }
    this.argsList = temp;
  }

  getStepNum(field: string, tranformArr: Transform[]) {
    return tranformArr.filter((x) => x.field == field).length;
  }

  applyTransform() {
    let temp: Transform = {
      field: this.editMapping?.activeField!,
      operation: this.selectedOperation,
      args: this.argsList,
      stepNum: this.getStepNum(this.editMapping?.activeField!, this.transform),
      output: null,
    };
    this.transform.push(temp);

    let transformedValue = this.applyTranformationOnField(
      this.editMapping?.activeField!
    );
    console.log(transformedValue);
    this.previewData[this.editMapping?.index!].value = this.getPreviewData();
    this.mappings[this.editMapping?.index!].transform = JSON.parse(
      JSON.stringify(this.transform)
    );
    this.argsList = [];
    this.selectedOperation = '';
    this.selectedField = '';
  }

  deleteTransform(index: number) {
    this.transform.splice(index, 1);
    for (var i = index; i < this.transform.length; i++) {
      if (this.transform[i].field == this.editMapping?.activeField) {
        this.transform[i].stepNum = this.transform[i].stepNum - 1;
      }
    }

    let transformedValue = this.applyTranformationOnField(
      this.editMapping?.activeField!
    );
    this.previewData[this.editMapping?.index!].value = this.getPreviewData();
    this.mappings[this.editMapping?.index!].transform = JSON.parse(
      JSON.stringify(this.transform)
    );
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

  viewMappings() {
    this.displayStyleMappings = 'block';
    this.dataToView = JSON.stringify(this.mappings);
  }

  downloadMappings() {}
}
