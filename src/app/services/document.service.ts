import { Injectable } from '@angular/core';
import { BaseService } from './Common/base.service';
import { DocumentModel } from 'app/models/EntityModels/Documents/DocumentModel';
import { ServicePath } from './base/ServicePath';
import { DomainService } from './Common/domain.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends BaseService<DocumentModel> {

  
  constructor(
    private client:HttpClient,
    private domain:DomainService,
    private path:ServicePath
  ) { 
    super(client,domain,path.DocumentPath)
  }
}
