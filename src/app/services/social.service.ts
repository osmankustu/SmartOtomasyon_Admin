import { Injectable } from '@angular/core';
import { BaseService } from './Common/base.service';
import { SocialLinkModel } from 'app/models/EntityModels/socialLinks/SocialLinkModel';
import { HttpClient } from '@angular/common/http';
import { DomainService } from './Common/domain.service';
import { ServicePath } from './base/ServicePath';

@Injectable({
  providedIn: 'root'
})
export class SocialService extends BaseService<SocialLinkModel> {

  constructor(
    private client:HttpClient,
    private domain:DomainService,
    private path:ServicePath
  ) { 
    super(client,domain,path.SocialPath)
  }
}
