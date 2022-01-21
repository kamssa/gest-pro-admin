import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEntreComponent } from './update-entre.component';

describe('UpdateEntreComponent', () => {
  let component: UpdateEntreComponent;
  let fixture: ComponentFixture<UpdateEntreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEntreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEntreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
