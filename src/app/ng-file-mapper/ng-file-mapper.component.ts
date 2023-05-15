import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapperService } from '../mapper.service';
import { MappedFields } from '../drop-down-mapper/drop-down-mapper.type';


@Component({
  selector: 'ng-file-mapper',
  templateUrl: './ng-file-mapper.component.html',
  styleUrls: ['./ng-file-mapper.component.css'],
})
export class NgFileMapperComponent {
 @Input() availableColumns:any[]=[]
 @Output() getMappings = new EventEmitter<any[]>();
 title = 'ng-file-mapper';
 
 constructor(private _mapperService: MapperService) {}

 ngOnInit(){
  this._mapperService.output$.subscribe(e=>{
    this.getMappings.emit(e)
  })
 }
}
