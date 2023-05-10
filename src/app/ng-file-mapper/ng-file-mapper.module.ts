import { NgModule } from '@angular/core';
import { FileMapperComponent } from '../file-mapper/file-mapper.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { DropDownMapperComponent } from '../drop-down-mapper/drop-down-mapper.component';
import { DragMapperComponent } from '../drag-mapper/drag-mapper.component';
import { FormsModule } from '@angular/forms';
import { DropDownMapperModule } from '../drop-down-mapper/drop-down-mapper.module';
import { NgFileMapperComponent } from './ng-file-mapper.component';


@NgModule({
  declarations: [
    FileMapperComponent,
    FileUploadComponent,
    DragMapperComponent,
    NgFileMapperComponent
  ],
  imports: [
    FormsModule,
    DropDownMapperModule
  ],
  exports:[NgFileMapperComponent],
  providers: [],
  bootstrap: []
})
export class NgFileMapperModule { }
