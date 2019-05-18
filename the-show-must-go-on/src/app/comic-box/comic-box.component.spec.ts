import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicBoxComponent } from './comic-box.component';

describe('ComicBoxComponent', () => {
  let component: ComicBoxComponent;
  let fixture: ComponentFixture<ComicBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
