import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideLeftComponent } from './side-left.component';

describe('SideLeftComponent', () => {
  let component: SideLeftComponent;
  let fixture: ComponentFixture<SideLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideLeftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
