import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomainService } from './Common/domain.service';
import { ServicePath } from './base/ServicePath';
import { BaseService } from './Common/base.service';
import { SliderModel } from 'app/models/EntityModels/Slider/SliderModel';

@Injectable({
  providedIn: 'root'
})
export class SliderService extends BaseService<SliderModel> {
  constructor(
    private client:HttpClient,
    private domain:DomainService,
    private path:ServicePath
  ) { 
    super(client,domain,path.SliderPath)
  }
}
