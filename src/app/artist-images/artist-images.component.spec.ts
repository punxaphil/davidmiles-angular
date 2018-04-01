import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistImagesComponent } from './artist-images.component';

describe('ArtistImagesComponent', () => {
  let component: ArtistImagesComponent;
  let fixture: ComponentFixture<ArtistImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
