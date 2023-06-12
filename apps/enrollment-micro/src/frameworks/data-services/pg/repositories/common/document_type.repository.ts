import { DocumentTypeEntity } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepositoryAbstract } from '../../../../../core/abstracts/base/base-repository.abstract';
import { IDocumentTypeRepository } from 'apps/enrollment-micro/src/core/interfaces/repositories/common/document-type-repository.interface';

@Injectable()
export class DocumentTypeRepository
  extends BaseRepositoryAbstract<DocumentTypeEntity>
  implements IDocumentTypeRepository
{
  constructor(
    @InjectRepository(DocumentTypeEntity)
    private readonly repository: Repository<DocumentTypeEntity>,
  ) {
    super(repository);
  }
}
