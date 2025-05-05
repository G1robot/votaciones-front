import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidoDetalleDialogComponent } from './partido-detalle-dialog.component';

describe('PartidoDetalleDialogComponent', () => {
  let component: PartidoDetalleDialogComponent;
  let fixture: ComponentFixture<PartidoDetalleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartidoDetalleDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidoDetalleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
