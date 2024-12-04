import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPersonListComponent } from './contact-person-list.component';

describe('ContactPersonListComponent', () => {
  let component: ContactPersonListComponent;
  let fixture: ComponentFixture<ContactPersonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPersonListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactPersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
