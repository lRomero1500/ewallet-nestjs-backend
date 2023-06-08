import { Test, TestingModule } from '@nestjs/testing';
import { DataServicesPgService } from './data-services-pg.service';

describe('DataServicesPgService', () => {
  let service: DataServicesPgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataServicesPgService],
    }).compile();

    service = module.get<DataServicesPgService>(DataServicesPgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
