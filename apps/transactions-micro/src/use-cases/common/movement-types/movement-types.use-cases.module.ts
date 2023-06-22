import { Module } from '@nestjs/common';
import { DataServicesPgModule } from 'apps/transactions-micro/src/frameworks/data-services/pg';
import { MovementTypesUseCases } from './movement-types.use-cases';

@Module({
  imports: [DataServicesPgModule],
  providers: [MovementTypesUseCases],
  exports: [MovementTypesUseCases],
})
export class MovementTypesUseCasesModule {}
