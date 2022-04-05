import { TestBed } from '@angular/core/testing';
import { CaledarService } from './caledar.service';

describe('CaledarService', () => {
  let service: CaledarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaledarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should generate a range of years with a start, end and a default', () => {
    const start = new Date(2000, 0, 1);
    const end = new Date(2020, 0, 1);
    const defaultYear = new Date(2010, 0, 1);
    const years = service.generateYears(start, end, defaultYear);
    expect(years.length).toBe(21);
    expect(years[0].label).toBe('2000');
    expect(years[20].label).toBe('2020');
    expect(years.find((y) => y.selected)!.label).toBe(
      defaultYear.getFullYear().toString()
    );
  });

  it('Should generate a range of months with a default', () => {
    const defaultMonth = new Date(2010, 0, 1);
    const months = service.generateMonths(defaultMonth);
    expect(months.length).toBe(12);
    expect(months[0].label).toBe('Jan');
    expect(months[11].label).toBe('Dec');
    expect(months.find((m) => m.selected)!.label).toBe('Jan');
  });

  it('Should generate a range of days with a default', () => {
    const defaultDay = new Date(2010, 0, 1);
    const days = service.generateDays(defaultDay);
    console.log(days);
    expect(days.length).toBe(31);
    expect(days[0].label).toBe('1');
    expect(days[30].label).toBe('31');
    expect(days.find((d) => d.selected)!.label).toBe('1');
  });

  it('Should get the days between the last sunday of last month and the first day of this month', () => {
    const defaultDay = new Date(2022, 3, 1);
    const calendarDays: any = service.generateBeginingDays(defaultDay);
    expect(calendarDays.length).toBe(2);
    expect(calendarDays[0].label).toBe('27');
    expect(calendarDays[1].label).toBe('28');
  });

  it('Should get the days between the first day of next month and the first saturday of the next month', () => {
    const defaultDay = new Date(2022, 3, 1);
    const calendarDays: any = service.generateEndDays(defaultDay);
    expect(calendarDays.length).toBe(2);
    expect(calendarDays[0].label).toBe('1');
    expect(calendarDays[1].label).toBe('2');
  });

  it('Should generate a full calendar ready for rendering', () => {
    const defaultDay = new Date(2022, 3, 1);
    const calendarDays: any = service.generateCalendar(defaultDay);
    expect(calendarDays.length).toBe(35);
    expect(calendarDays[0].label).toBe('27');
    expect(calendarDays[1].label).toBe('28');
    expect(calendarDays[2].label).toBe('1');
    expect(calendarDays[3].label).toBe('2');
    expect(calendarDays[4].label).toBe('3');
    expect(calendarDays[5].label).toBe('4');
    expect(calendarDays[6].label).toBe('5');
    expect(calendarDays[7].label).toBe('6');
    expect(calendarDays[8].label).toBe('7');
    expect(calendarDays[9].label).toBe('8');
    expect(calendarDays[10].label).toBe('9');
    expect(calendarDays[11].label).toBe('10');
    expect(calendarDays[12].label).toBe('11');
    expect(calendarDays[13].label).toBe('12');
    expect(calendarDays[14].label).toBe('13');
    expect(calendarDays[15].label).toBe('14');
    expect(calendarDays[16].label).toBe('15');
    expect(calendarDays[17].label).toBe('16');
    expect(calendarDays[18].label).toBe('17');
    expect(calendarDays[19].label).toBe('18');
    expect(calendarDays[20].label).toBe('19');
    expect(calendarDays[21].label).toBe('20');
    expect(calendarDays[22].label).toBe('21');
    expect(calendarDays[23].label).toBe('22');
    expect(calendarDays[24].label).toBe('23');
    expect(calendarDays[25].label).toBe('24');
    expect(calendarDays[26].label).toBe('25');
    expect(calendarDays[27].label).toBe('26');
    expect(calendarDays[28].label).toBe('27');
    expect(calendarDays[29].label).toBe('28');
    expect(calendarDays[30].label).toBe('29');
    expect(calendarDays[31].label).toBe('30');
    expect(calendarDays[32].label).toBe('31');
    expect(calendarDays[33].label).toBe('1');
    expect(calendarDays[34].label).toBe('2');
  });
});
