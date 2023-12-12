import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTipoProductoComponent } from './registrar-tipo-producto.component';

describe('RegistrarTipoProductoComponent', () => {
  let component: RegistrarTipoProductoComponent;
  let fixture: ComponentFixture<RegistrarTipoProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarTipoProductoComponent]
    });
    fixture = TestBed.createComponent(RegistrarTipoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
