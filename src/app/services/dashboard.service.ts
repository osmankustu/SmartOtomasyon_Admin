import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomainService } from './Common/domain.service';
import { Observable } from 'rxjs';
import { SingleServiceResponse } from 'app/models/ResponseModels/SingleServiceResponse';
import { DashboardData } from 'app/models/EntityModels/Dashboard/DashboardData';
import { ListServiceResponse } from 'app/models/ResponseModels/ListServiceResponse';
import { VisitorModel } from 'app/models/EntityModels/Visitors/VisitorModel';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private client:HttpClient, private domain:DomainService) { }


  getDashboardData():Observable<SingleServiceResponse<DashboardData>>{
    return this.client.get<SingleServiceResponse<DashboardData>>(this.domain.domain+"Visitors/dashData");
  }

  getVisitors():Observable<ListServiceResponse<VisitorModel>>{
    return this.client.get<ListServiceResponse<VisitorModel>>(this.domain.domain+"Visitors");
  }
}
