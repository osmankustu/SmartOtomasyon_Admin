import { Injectable } from '@angular/core';
import { BaseService } from './Common/base.service';
import { FooterModel } from 'app/models/EntityModels/footer/FooterModel';
import { HttpClient } from '@angular/common/http';
import { DomainService } from './Common/domain.service';
import { ServicePath } from './base/ServicePath';

@Injectable({
  providedIn: 'root'
})
export class FooterService extends BaseService<FooterModel> {

  constructor(
    private client:HttpClient,
    private domain:DomainService,
    private path:ServicePath
  ) { 
    super(client,domain,path.FooterPath)
  }
}
