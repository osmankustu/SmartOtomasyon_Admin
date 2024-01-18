import { Injectable } from '@angular/core';
import { BaseService } from './Common/base.service';
import { MailModel } from 'app/models/EntityModels/Mail/MailModel';
import { HttpClient } from '@angular/common/http';
import { DomainService } from './Common/domain.service';
import { ServicePath } from './base/ServicePath';

@Injectable({
  providedIn: 'root'
})
export class MailService extends BaseService<MailModel>{

  constructor(
    private client: HttpClient,
    private domain: DomainService,
    private servicePath: ServicePath
  ) {
    super(client, domain, servicePath.MailPath);
  }
}
