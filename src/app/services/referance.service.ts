import { Injectable } from "@angular/core";
import { DomainService } from "./Common/domain.service";
import { HttpClient } from "@angular/common/http";
import { ReferanceModel } from "app/models/EntityModels/Referance/ReferanceModel";
import { BaseService } from "./Common/base.service";
import { ServicePath } from "./base/ServicePath";
import { IReferanceServiceRepository } from "./interfaces/IReferanceServiceRepository";
import { ListServiceResponse } from "app/models/ResponseModels/ListServiceResponse";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReferanceService
  extends BaseService<ReferanceModel>
  implements IReferanceServiceRepository<ReferanceModel>
{
  constructor(
    private client: HttpClient,
    private domain: DomainService,
    private servicePath: ServicePath
  ) {
    super(client, domain, servicePath.ReferancePath);
  }
}
