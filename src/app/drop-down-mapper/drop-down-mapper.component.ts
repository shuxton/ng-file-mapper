import { Component, Input } from '@angular/core';
import { MapperService } from '../mapper.service';

@Component({
  selector: 'app-drop-down-mapper',
  templateUrl: './drop-down-mapper.component.html',
  styleUrls: ['./drop-down-mapper.component.css'],
})
export class DropDownMapperComponent {
  @Input() availableColumns: any[] = [];
  headerRow:string[]=[]
  previewRow:string[]=[]
  yourField:string[]=[]
  ourField:string=''

  constructor(private _mapperService: MapperService) {}

  ngOnInit(): void {
    this._mapperService.parsedData$.subscribe((e) => {
      this.headerRow = e.headerRow;
      this.previewRow = e.previewRow;
      this.yourField = [this.headerRow[0]];
      this.ourField = this.availableColumns[0]?.columns[0]?.name;
    });
  }
}
