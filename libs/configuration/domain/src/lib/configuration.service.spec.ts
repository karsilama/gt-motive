import { TestBed } from '@angular/core/testing';
import {
  BASE_CONFIGURATION,
  BaseConfiguration,
} from '@configuration/infrastructure';
import { ConfigurationService } from './configuration.service';

describe('ConfigurationService', () => {
  let service: ConfigurationService;
  const mockBaseConfig: BaseConfiguration = {
    api: {
      url: 'https://vpic.nhtsa.dot.gov/api',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigurationService,
        {
          provide: BASE_CONFIGURATION,
          useValue: mockBaseConfig,
        },
      ],
    });
    service = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the base configuration', () => {
    const config = service.getBaseConfiguration();
    expect(config).toEqual(mockBaseConfig);
  });
});
