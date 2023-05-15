import { Component, Input } from '@angular/core';
import { MapperService } from '../mapper.service';
import { MappedFields } from '../drop-down-mapper/drop-down-mapper.type';

@Component({
  selector: 'app-file-mapper',
  templateUrl: './file-mapper.component.html',
  styleUrls: ['./file-mapper.component.css'],
})
export class FileMapperComponent {
  headerRow: string[] = [];
  mappings: MappedFields[]=[]
  @Input() availableColumns:any[]=[]

  constructor(private _mapperService: MapperService) {}

  ngOnInit(): void {
    this._mapperService.parsedData$.subscribe((e) => {
      this.headerRow = e.headerRow;
    });

    this._mapperService.mappedData$.subscribe((e) => {
      this.mappings = e;
    });
  }

  generateMapping(){
    this._mapperService.output$.emit(this.mappings)
  }
}
