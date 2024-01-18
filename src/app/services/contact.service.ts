import { Injectable } from '@angular/core';
import { BaseService } from './Common/base.service';
import { PhoneNumberModel } from 'app/models/EntityModels/phoneNumber/PhoneNumberModel';
import { HttpClient } from '@angular/common/http';
import { DomainService } from './Common/domain.service';
import { ServicePath } from './base/ServicePath';

@Injectable({
  providedIn: 'root'
})
export class ContactService  extends BaseService<PhoneNumberModel>{

  constructor(
    private client:HttpClient,
    private domain:DomainService,
    private path:ServicePath
  ) { 
    super(client,domain,path.ContactPath)
  }
}
