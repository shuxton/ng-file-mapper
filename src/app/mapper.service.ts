import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MappedFields } from './drop-down-mapper/drop-down-mapper.type';

export type ParsedData={
  headerRow:string[],
  firstRow:string[],
  previewRow:string[]
}

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  private parsedData = new BehaviorSubject<ParsedData>({
    headerRow:[],
    firstRow:[],
    previewRow:[]
  });
  private mappedData = new BehaviorSubject<MappedFields[]>([])

  parsedData$ = this.parsedData.asObservable();
  mappedData$ = this.mappedData.asObservable();


  addParsedData(parsedData: ParsedData) {
    parsedData.previewRow=parsedData.firstRow
    this.parsedData.next(parsedData);
  }

  addMappedData(mappedData: MappedFields[]) {
    this.mappedData.next(JSON.parse(JSON.stringify(mappedData)));
  }
 
}
