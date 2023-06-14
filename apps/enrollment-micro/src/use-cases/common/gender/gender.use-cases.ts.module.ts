import { Module } from '@nestjs/common';
import {
  DataServicesPgModule,
  GenderRepository,
} from 'apps/enrollment-micro/src/frameworks';
import { GenderUseCases } from './gender.use-cases';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { GenderMappingProfile } from '../../mapping/common/gender.mapping.profile';

@Module({
  imports: [
    DataServicesPgModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [
    GenderUseCases,
    {
      provide: 'IGenderRepository',
      useClass: GenderRepository,
    },
    GenderMappingProfile,
  ],
  exports: [GenderUseCases],
})
export class GenderUseCasesTsModule {}
