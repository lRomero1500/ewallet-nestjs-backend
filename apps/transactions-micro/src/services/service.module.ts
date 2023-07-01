import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TCPAuthConfigs } from '../config/tcp.config';
import { JwtStrategyService } from './jwt';
import { AuthProxyService } from './auth';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ClientsModule.register(TCPAuthConfigs),
  ],
  providers: [JwtStrategyService, AuthProxyService],
  exports: [JwtStrategyService, AuthProxyService],
})
export class ServiceModule {}
