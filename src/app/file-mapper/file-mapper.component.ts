import { Component, Input } from '@angular/core';
import { MapperService } from '../mapper.service';

@Component({
  selector: 'app-file-mapper',
  templateUrl: './file-mapper.component.html',
  styleUrls: ['./file-mapper.component.css'],
})
export class FileMapperComponent {
  headerRow: string[] = [];
  @Input() availableColumns:any[]=[]

  constructor(private _mapperService: MapperService) {}

  ngOnInit(): void {
    this._mapperService.parsedData$.subscribe((e) => {
      this.headerRow = e.headerRow;
    });
  }
}
