import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapperService } from '../../mapper.service';
import { MappedFields, Operation, Transform } from '../drop-down-mapper.type';

@Component({
  selector: 'edit-transformations',
  templateUrl: './edit-transformations.component.html',
  styleUrls: ['./edit-transformations.component.css'],
})
export class EditTransformationsComponent {
  @Input() editMapping: MappedFields | null = null;
  @Input() transform: Transform[] = [];
  @Input() displayStyle = 'none';
  @Output() closeEditTranformations = new EventEmitter<string>();

  argsList: string[] = [];
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
  mappings: MappedFields[] = [];
  constructor(private _mapperService: MapperService) {}

  ngOnInit(): void {
    this._mapperService.mappedData$.subscribe((e) => (this.mappings = e));
  }
  closePopup() {
    this.displayStyle = 'none';
    this.closeEditTranformations.emit('none');
  }

  filterTransformations(value: any): any[] {
    return value.filter((v: any) => v.field == this.editMapping?.activeField);
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
    this.updateMapping();
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
    this.updateMapping();
  }

  updateMapping() {
    this.mappings[this.editMapping?.index!].transform = JSON.parse(
      JSON.stringify(this.transform)
    );
    this._mapperService.addMappedData(this.mappings);
  }
}
