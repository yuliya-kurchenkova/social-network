import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelUserModalComponent } from './del-user-modal.component';

describe('DelUserModalComponent', () => {
  let component: DelUserModalComponent;
  let fixture: ComponentFixture<DelUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelUserModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
