import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CenterContentModel } from 'app/models/EntityModels/CenterContent/CenterContentModel';
import { DomainService } from './Common/domain.service';
import { ServicePath } from './base/ServicePath';
import { BaseService } from './Common/base.service';

@Injectable({
  providedIn: 'root'
})
export class CenterContentService extends BaseService<CenterContentModel>{

  constructor(
    private client: HttpClient,
    private domain: DomainService,
    private path: ServicePath
  ) {
    super(client, domain, path.CenterContentPath);
  }
}
