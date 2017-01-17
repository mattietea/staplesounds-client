/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SongNewComponent } from './song-new.component';

describe('SongNewComponent', () => {
  let component: SongNewComponent;
  let fixture: ComponentFixture<SongNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
