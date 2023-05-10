import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapperService } from '../../mapper.service';
import { MappedFields } from '../drop-down-mapper.type';

@Component({
  selector: 'edit-combinations',
  templateUrl: './edit-combinations.component.html',
  styleUrls: ['./edit-combinations.component.css'],
})
export class EditCombinationsComponent {
  @Input() editMapping: MappedFields | null = null;
  @Input() combination: string[] = [];
  @Input() displayStyleCombination = 'none';
  @Output() closeEditCombinations = new EventEmitter<string>();
  mappings: MappedFields[] = [];
  constructor(private _mapperService: MapperService) {}

  ngOnInit(): void {
    this._mapperService.mappedData$.subscribe((e) => (this.mappings = e));
  }

  closePopup() {
    this.displayStyleCombination = 'none';
    this.closeEditCombinations.emit('none');
  }

  filterCombinations(value: any): any[] {
    return value?.filter(
      (v: any) => this.combination.findIndex((a) => a == v) == -1
    );
  }

  deleteCombination(index: number) {
    this.combination.splice(index, 1);
    this.updateMapping();
  }

  addCombination() {
    this.combination.push(this.editMapping?.activeField!);
    this.updateMapping();
  }

  updateMapping() {
    this.mappings[this.editMapping?.index!].combination = JSON.parse(
      JSON.stringify(this.combination)
    );
    this._mapperService.addMappedData(this.mappings);
  }
}
