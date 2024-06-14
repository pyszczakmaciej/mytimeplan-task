import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCardComponentComponent } from './type-card-component.component';

describe('TypeCardComponentComponent', () => {
  let component: TypeCardComponentComponent;
  let fixture: ComponentFixture<TypeCardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeCardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
