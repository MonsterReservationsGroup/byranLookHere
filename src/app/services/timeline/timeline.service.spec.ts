import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TimelineService } from './timeline.service';

class MockRouter {
  currentPath = '';
  navigate(path: Array<string>) {
    this.currentPath = path.join('');
  }
}

describe('TimelineService', () => {
  let service: TimelineService;
  let router: MockRouter;

  beforeEach(() => {
    router = new MockRouter();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: router,
        },
      ],
    });
    service = TestBed.inject(TimelineService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should go to the next page', () => {
    service.routes = ['a', 'b', 'c'];
    service.next();
    expect(service.currentIndex).toBe(1);
    expect(router.currentPath).toBe('b');
    service.next();
    expect(service.currentIndex).toBe(2);
    expect(router.currentPath).toBe('c');
  });

  it('Should go to the previous page', () => {
    service.routes = ['a', 'b', 'c'];
    service.currentIndex = 2;
    service.back();
    expect(service.currentIndex).toBe(1);
    expect(router.currentPath).toBe('b');
    service.back();
    expect(service.currentIndex).toBe(0);
    expect(router.currentPath).toBe('a');
  });

  it('Should register a callback', () => {
    let output = false;
    const callback = () => {
      output = true;
      return true;
    };
    service.registerCallback(callback);
    service.next();
    expect(output).toBe(true);
  });
});
