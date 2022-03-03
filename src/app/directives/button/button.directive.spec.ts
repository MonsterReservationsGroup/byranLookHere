import { ButtonDirective } from './button.directive';

class MockClassList {
  private _classList: string[] = [];
  add = (name: string) => this._classList.push(name);
  contains = (name: string) => this._classList.indexOf(name) !== -1;
}

class MockElementRef {
  nativeElement = {
    children: [] as Array<any>,
    style: {},
    classList: new MockClassList(),
    appendChild(el: any) {
      this.children.push(el);
    },
  };
}

describe('ButtonDirective', () => {
  let ref: MockElementRef;
  let directive: ButtonDirective;

  beforeEach(() => {
    ref = new MockElementRef();
    directive = new ButtonDirective(ref);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('Should create a default button', () => {
    directive.ngOnChanges();
    expect(ref.nativeElement.style).toMatchObject({
      borderRadius: '6px',
      padding: '10px',
      cursor: 'pointer',
      outline: 'none',
      border: 'none',
      color: '#fff',
      fontWeight: 'bold',
      backgroundColor: ' #22931f',
    });
  });

  it('Should create a light button', () => {
    directive.config = { coloring: 'light' };
    directive.ngOnChanges();
    expect(ref.nativeElement.style).toMatchObject({
      borderRadius: '6px',
      padding: '10px',
      cursor: 'pointer',
      outline: 'none',
      border: 'none',
      color: '#fff',
      fontWeight: 'bold',
      backgroundColor: ' #2cb827',
    });
  });

  it('Should create an inverted button', () => {
    directive.config = { coloring: 'inverted' };
    directive.ngOnChanges();
    expect(ref.nativeElement.style).toMatchObject({
      borderRadius: '6px',
      padding: '10px',
      cursor: 'pointer',
      outline: 'none',
      border: 'none',
      color: ' #22931f',
      fontWeight: 'normal',
      backgroundColor: '#fff',
    });
  });

  it('Should apply a bounce animation', () => {
    directive.config = { bouncy: true };
    directive.ngOnChanges();
    expect(ref.nativeElement.classList.contains('bouncy')).toBeTruthy();
    expect(ref.nativeElement.children[0].innerHTML).toContain('primary');
  });
});
