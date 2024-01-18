import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomainService } from './Common/domain.service';
import { ServicePath } from './base/ServicePath';
import { BaseService } from './Common/base.service';
import { EndContentModel } from 'app/models/EntityModels/EndContent/EndContentModel';

@Injectable({
  providedIn: 'root'
})
export class EndContentService extends BaseService<EndContentModel> {

  constructor(
    private client: HttpClient,
    private domain: DomainService,
    private path: ServicePath
  ) {
    super(client, domain, path.EndContentPath);
  }
}
