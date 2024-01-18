import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomainService } from "./Common/domain.service";
import { BaseService } from "./Common/base.service";
import { ImageModel } from "app/models/EntityModels/Image/ImageModel";
import { ServicePath } from "./base/ServicePath";

@Injectable({
  providedIn: "root",
})
export class ImageService extends BaseService<ImageModel> {
  constructor(
    private client: HttpClient,
    private domain: DomainService,
    private servicePath: ServicePath
  ) {
    super(client, domain, servicePath.ImagePath);
  }
}
