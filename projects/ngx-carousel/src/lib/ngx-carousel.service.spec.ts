import { TestBed } from '@angular/core/testing';

import { NgxCarouselService } from './ngx-carousel.service';

describe('NgxCarouselService', () => {
  let service: NgxCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
