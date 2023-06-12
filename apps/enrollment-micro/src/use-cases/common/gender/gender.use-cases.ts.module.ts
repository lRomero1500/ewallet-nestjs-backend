import { Module } from '@nestjs/common';
import {
  DataServicesPgModule,
  GenderRepository,
} from 'apps/enrollment-micro/src/frameworks';
import { GenderUseCases } from './gender.use-cases';

@Module({
  imports: [DataServicesPgModule],
  providers: [
    GenderUseCases,
    {
      provide: 'IGenderRepository',
      useClass: GenderRepository,
    },
  ],
  exports: [GenderUseCases],
})
export class GenderUseCasesTsModule {}
