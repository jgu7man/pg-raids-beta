import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSubscribedComponent } from './room-subscribed.component';

describe('RoomSubscribedComponent', () => {
  let component: RoomSubscribedComponent;
  let fixture: ComponentFixture<RoomSubscribedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomSubscribedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSubscribedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
