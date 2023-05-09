import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  parsedData$ = this.parsedData.asObservable();

  addParsedData(parsedData: ParsedData) {
    parsedData.previewRow=parsedData.firstRow
    this.parsedData.next(parsedData);
  }

}
