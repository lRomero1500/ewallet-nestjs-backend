import { Inject, Injectable } from '@nestjs/common';
import { ISecurityService } from '../../core/interfaces';
@Injectable()
export class SecurityUseCases {
  constructor(
    @Inject('ISecurityService')
    private readonly securityService: ISecurityService,
  ) {}
}
