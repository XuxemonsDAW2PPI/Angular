import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaxuxemonsSincrudComponent } from './listaxuxemons-sincrud.component';

describe('ListaxuxemonsSincrudComponent', () => {
  let component: ListaxuxemonsSincrudComponent;
  let fixture: ComponentFixture<ListaxuxemonsSincrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaxuxemonsSincrudComponent]
    });
    fixture = TestBed.createComponent(ListaxuxemonsSincrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
