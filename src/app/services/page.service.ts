import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomainService } from './Common/domain.service';
import { ServicePath } from './base/ServicePath';
import { BaseService } from './Common/base.service';
import { PageModel } from 'app/models/EntityModels/Page/PageModel';

@Injectable({
  providedIn: 'root'
})
export class PageService extends BaseService<PageModel> {
  constructor(
    private client: HttpClient,
    private domain: DomainService,
    private servicePath: ServicePath
  ) {
    super(client, domain, servicePath.PagePath);
  }
}
