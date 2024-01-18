import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PartnerModel } from 'app/models/EntityModels/Partner/PartnerModel';
import { DomainService } from './Common/domain.service';
import { ServicePath } from './base/ServicePath';
import { BaseService } from './Common/base.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerService extends BaseService<PartnerModel>{
  constructor(
    private client: HttpClient,
    private domain: DomainService,
    private servicePath: ServicePath
  ) {
    super(client, domain, servicePath.PartnerPath);
  }
}
