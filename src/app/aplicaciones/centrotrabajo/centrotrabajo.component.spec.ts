import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrotrabajoComponent } from './centrotrabajo.component';

describe('CentrotrabajoComponent', () => {
  let component: CentrotrabajoComponent;
  let fixture: ComponentFixture<CentrotrabajoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentrotrabajoComponent]
    });
    fixture = TestBed.createComponent(CentrotrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
