import { Test, TestingModule } from '@nestjs/testing';
import { KafkaProxyService } from './kafka-proxy.service';

describe('KafkaProxyService', () => {
  let service: KafkaProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KafkaProxyService],
    }).compile();

    service = module.get<KafkaProxyService>(KafkaProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
