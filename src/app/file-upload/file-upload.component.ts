import { Component } from '@angular/core';
import { MapperService } from '../mapper.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  headerRow: string[] = [];
  error: boolean = false;
  firstRow: string[] = [];

  constructor(private _mapperService: MapperService) {}

  onFileSelected(event: any) {
    this.error = false;
    const file: File = event.target.files[0];
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
}
