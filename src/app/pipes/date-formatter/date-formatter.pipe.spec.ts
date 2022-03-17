import { DateFormatterPipe } from './date-formatter.pipe';

describe('DateFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormatterPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should return a formatted date in mmm d, yyyy', () => {
    const pipe = new DateFormatterPipe();
    const date = new Date('01/01/2019');
    const result = pipe.transform(date.toString());
    expect(result).toEqual('Jan 01, 2019');
  });
});
