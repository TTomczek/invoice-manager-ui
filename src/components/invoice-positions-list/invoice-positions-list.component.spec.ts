import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePositionsListComponent } from './invoice-positions-list.component';

describe('InvoicePositionsListComponent', () => {
  let component: InvoicePositionsListComponent;
  let fixture: ComponentFixture<InvoicePositionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicePositionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicePositionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
