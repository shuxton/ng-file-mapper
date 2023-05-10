import { Component, Input } from '@angular/core';
import { MapperService } from '../../mapper.service';
import { MappedFields } from '../drop-down-mapper.type';

@Component({
  selector: 'drop-down-mapper-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css'],
})
export class ColumnsComponent {
  selectedColumnConfig: number = 0;
  @Input() yourField: string[] = [];
  @Input() ourField: string = '';
  mappings: MappedFields[] = [];
  @Input()   previewRow: string[] = [];
  @Input()   headerRow: string[] = [];
  @Input() availableColumns: any[] = [];

  constructor(private _mapperService: MapperService) {}

  ngOnInit(): void {
    this._mapperService.mappedData$.subscribe((e) => {
      this.mappings = e;
    });
  }

  handleMappedField() {
    const index = this.mappings.findIndex(
      (a: any) => a.ourField == this.ourField
    );
    if (index == -1) return;
    this.mappings.splice(index,1);
    this._mapperService.addMappedData(this.mappings)
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
    this.mappings.push(mappedFields)
    this._mapperService.addMappedData(this.mappings)
  }
}
