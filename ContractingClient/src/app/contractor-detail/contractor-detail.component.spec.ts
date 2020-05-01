import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorDetailComponent } from './contractor-detail.component';

describe('ContractorDetailComponent', () => {
  let component: ContractorDetailComponent;
  let fixture: ComponentFixture<ContractorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
