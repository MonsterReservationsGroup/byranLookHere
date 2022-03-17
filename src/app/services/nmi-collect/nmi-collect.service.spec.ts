import { TestBed } from '@angular/core/testing';
import { NmiCollectService } from './nmi-collect.service';

describe('NmiCollectService', () => {
  let service: NmiCollectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NmiCollectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should provide correct token display data', () => {
    const testToken = {
      card: {
        type: 'visa',
        exp: '1220',
        number: '1111',
      },
    } as any;

    const displayData = service.getDisplayData(testToken);
    expect(displayData.lastFourDigits).toEqual('1111');
    expect(displayData.expirationDate).toEqual('12/20');
    expect(displayData.cardIcon).toEqual('../../../assets/Cards/visa.png');
    expect(displayData.lastUpdate).toBeTruthy();
    expect(typeof displayData.lastUpdate).toBe('string');
  });
});
