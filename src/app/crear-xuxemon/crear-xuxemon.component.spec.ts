import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearXuxemonComponent } from './crear-xuxemon.component';

describe('CrearXuxemonComponent', () => {
  let component: CrearXuxemonComponent;
  let fixture: ComponentFixture<CrearXuxemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearXuxemonComponent]
    });
    fixture = TestBed.createComponent(CrearXuxemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
