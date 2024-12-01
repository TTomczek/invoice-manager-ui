import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPartnersListComponent } from './business-partners-list.component';

describe('BusinessPartnersListComponent', () => {
  let component: BusinessPartnersListComponent;
  let fixture: ComponentFixture<BusinessPartnersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessPartnersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessPartnersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
