import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragMapperComponent } from './drag-mapper.component';

describe('DragMapperComponent', () => {
  let component: DragMapperComponent;
  let fixture: ComponentFixture<DragMapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DragMapperComponent]
    });
    fixture = TestBed.createComponent(DragMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
