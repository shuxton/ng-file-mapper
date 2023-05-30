import { Component, Input } from '@angular/core';
import { MapperService } from '../mapper.service';
import * as XLSX from 'xlsx';
import { LabelsConfig } from '../ng-file-mapper/ng-file-mapper';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  @Input() labelsConfig:LabelsConfig={}
  headerRow: string[] = [];
  error: boolean = false;
  firstRow: string[] = [];

  constructor(private _mapperService: MapperService) {}

  onFileSelected(event: any) {
    this.error = false;
    const file: File = event.target.files[0];
    const ext = file.name.split('.');
    const fileType = ext[ext.length - 1];
    console.log(fileType);
    if (fileType == 'csv') this.handleCSV(file);
    else if (fileType == 'xlsx') this.handleXLSX(file);
  }

  uploadFile() {
    if (this.headerRow.length == 0) {
      this.error = true;
    } else {
      this._mapperService.addParsedData({
        headerRow: this.headerRow,
        firstRow: this.firstRow,
        previewRow: this.firstRow,
      });
    }
  }

  handleCSV(file: File) {
    console.log(file.name);
    console.log(file.size);
    console.log(file.type);
    let reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      let csv: string = reader.result as string;
      let rows: string[] = csv.split('\n');
      this.headerRow = rows[0].split(',');
      if (rows.length > 1) this.firstRow = rows[1].split(',');
    };
  }

  handleXLSX(file: File) {
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      var arrayBuffer: any = fileReader.result!;
      var data = new Uint8Array(arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, { type: 'binary' ,sheetRows:2});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      if (arraylist.length > 0) {
        this.headerRow = Object.keys(arraylist[0]!);
        this.firstRow = Object.values(arraylist[0]!);
      }
    };
  }
}
