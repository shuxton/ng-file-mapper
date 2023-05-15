import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColumnsComponent } from './columns/columns.component';
import { DropDownMapperComponent } from './drop-down-mapper.component';
import { EditTransformationsComponent } from './edit-transformations/edit-transformations.component';
import { EditCombinationsComponent } from './edit-combinations/edit-combinations.component';
import { MappingTableComponent } from './mapping-table/mapping-table.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ColumnsComponent,
    EditTransformationsComponent,
    EditCombinationsComponent,
    MappingTableComponent,
    DropDownMapperComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[DropDownMapperComponent],
  providers: [],
  bootstrap: []
})
export class DropDownMapperModule { }
