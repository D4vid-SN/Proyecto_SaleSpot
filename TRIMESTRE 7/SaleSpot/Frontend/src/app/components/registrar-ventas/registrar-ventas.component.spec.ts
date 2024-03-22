import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVentaComponent } from './registrar-ventas.component';

describe('RegistrarVentasComponent', () => {
  let component: RegistrarVentaComponent;
  let fixture: ComponentFixture<RegistrarVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarVentaComponent]
    });
    fixture = TestBed.createComponent(RegistrarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
