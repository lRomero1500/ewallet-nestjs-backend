import { Injectable } from '@nestjs/common';
import { BaseRepositoryAbstract } from 'apps/enrollment-micro/src/core';
import { PersonEntity } from '../../entities';
import { IPersonRepository } from 'apps/enrollment-micro/src/core/interfaces/repositories/person/person-respository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PersonRepository
  extends BaseRepositoryAbstract<PersonEntity>
  implements IPersonRepository
{
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {
    super(personRepository);
  }
}
