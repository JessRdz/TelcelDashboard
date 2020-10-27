import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifacionesComponent } from './notifaciones.component';

describe('NotifacionesComponent', () => {
  let component: NotifacionesComponent;
  let fixture: ComponentFixture<NotifacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
