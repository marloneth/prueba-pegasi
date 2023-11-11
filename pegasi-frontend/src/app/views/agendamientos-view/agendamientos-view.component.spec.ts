import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamientosViewComponent } from './agendamientos-view.component';

describe('AgendamientosViewComponent', () => {
  let component: AgendamientosViewComponent;
  let fixture: ComponentFixture<AgendamientosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamientosViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamientosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
