import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentProxyService } from './enrollment-proxy.service';

describe('EnrollmentProxyService', () => {
  let service: EnrollmentProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnrollmentProxyService],
    }).compile();

    service = module.get<EnrollmentProxyService>(EnrollmentProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
