import { Injectable } from "@angular/core";
import { BaseService } from "./Common/base.service";
import { AboutModel } from "app/models/EntityModels/about/AboutModel";
import { HttpClient } from "@angular/common/http";
import { DomainService } from "./Common/domain.service";
import { ServicePath } from "./base/ServicePath";

@Injectable({
  providedIn: "root",
})
export class AboutService extends BaseService<AboutModel> {
  constructor(
    private client: HttpClient,
    private domain: DomainService,
    private path: ServicePath
  ) {
    super(client, domain, path.AboutPath);
  }
}
