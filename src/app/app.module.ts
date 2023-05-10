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


@NgModule({
  declarations: [
    AppComponent,
    FileMapperComponent,
    FileUploadComponent,
    DragMapperComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DropDownMapperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
