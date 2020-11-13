import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetNicknameComponent } from './get-nickname.component';

describe('GetNicknameComponent', () => {
  let component: GetNicknameComponent;
  let fixture: ComponentFixture<GetNicknameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetNicknameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetNicknameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
