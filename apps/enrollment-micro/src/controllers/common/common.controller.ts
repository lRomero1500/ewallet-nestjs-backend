import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import {
  DocumentTypeUseCases,
  GenderUseCases,
  StatusUseCases,
} from '../../use-cases/common';
import { DocumentTypeEntity, GenderEntity, StatusEntity } from '../../core';
import { CommonResponseInterceptorInterceptor } from '../../core/interceptors/common/common-response-interceptor.interceptor';

@Controller({
  version: '1',
  path: 'common',
})
@UseInterceptors(CommonResponseInterceptorInterceptor)
export class CommonController {
  constructor(
    private readonly documentTypeUseCases: DocumentTypeUseCases,
    private readonly statusUseCases: StatusUseCases,
    private readonly genderUseCases: GenderUseCases,
  ) {}

  @Get('/document-types')
  async getDocumentTypes(): Promise<Observable<DocumentTypeEntity[]>> {
    return from(this.documentTypeUseCases.getDocumentTypes());
  }
  @Get('/genders')
  getGenders(): Observable<GenderEntity[]> {
    return from(this.genderUseCases.getGenders());
  }
  @Get('/statuses')
  getStatuses(): Observable<StatusEntity[]> {
    return from(this.statusUseCases.getStatuses());
  }
}
