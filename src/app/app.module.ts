import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileMapperComponent } from './file-mapper/file-mapper.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DropDownMapperComponent } from './drop-down-mapper/drop-down-mapper.component';
import { DragMapperComponent } from './drag-mapper/drag-mapper.component';
import { FormsModule } from '@angular/forms';
import { DropDownMapperModule } from './drop-down-mapper/drop-down-mapper.module';
import { NgFileMapperComponent } from './ng-file-mapper/ng-file-mapper.component';
import { NgFileMapperModule } from './ng-file-mapper/ng-file-mapper.module';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgFileMapperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
