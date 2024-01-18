import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomainService } from './Common/domain.service';
import { ServicePath } from './base/ServicePath';
import { BaseService } from './Common/base.service';
import { MetaModel } from 'app/models/EntityModels/Meta/MetaModel';

@Injectable({
  providedIn: 'root'
})
export class MetaService extends BaseService<MetaModel> {

  constructor(
    private client: HttpClient,
    private domain: DomainService,
    private servicePath: ServicePath
  ) {
    super(client, domain, servicePath.MetaPath);
  }
}
