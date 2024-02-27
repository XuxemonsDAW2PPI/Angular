import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditXuxemonComponent } from './edit-xuxemon.component';

describe('EditXuxemonComponent', () => {
  let component: EditXuxemonComponent;
  let fixture: ComponentFixture<EditXuxemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditXuxemonComponent]
    });
    fixture = TestBed.createComponent(EditXuxemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
