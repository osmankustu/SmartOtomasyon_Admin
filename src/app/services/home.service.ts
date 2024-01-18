import { Injectable } from '@angular/core';
import { BaseService } from './Common/base.service';
import { HttpClient } from '@angular/common/http';
import { DomainService } from './Common/domain.service';
import { ServicePath } from './base/ServicePath';
import { HomeModel } from 'app/models/EntityModels/Home/HomeModel';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService<HomeModel>{

  constructor(
    private client:HttpClient,
    private domain:DomainService,
    private path:ServicePath
  ) { 
    super(client,domain,path.HomePath)
  }
}
