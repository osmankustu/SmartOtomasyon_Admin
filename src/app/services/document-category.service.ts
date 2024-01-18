import { Injectable } from '@angular/core';
import { BaseService } from './Common/base.service';
import { DocumentCategoryModel } from 'app/models/EntityModels/DocumentCategory/DocumentCategoryModel';
import { HttpClient } from '@angular/common/http';
import { DomainService } from './Common/domain.service';
import { ServicePath } from './base/ServicePath';

@Injectable({
  providedIn: 'root'
})
export class DocumentCategoryService extends BaseService<DocumentCategoryModel>{

  constructor(
    private client:HttpClient,
    private domain:DomainService,
    private path:ServicePath
  ) { 
    super(client,domain,path.DoumentCategoryPath)
  }
}
