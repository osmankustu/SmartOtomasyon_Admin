import { Injectable } from "@angular/core";
import { BaseService } from "./Common/base.service";
import { ImageCategoryModel } from "app/models/EntityModels/ImageCategory/ImageCategoryModel";
import { HttpClient } from "@angular/common/http";
import { DomainService } from "./Common/domain.service";
import { ServicePath } from "./base/ServicePath";

@Injectable({
  providedIn: "root",
})
export class ImageCategoryService extends BaseService<ImageCategoryModel> {
  constructor(
    private client: HttpClient,
    private domain: DomainService,
    private servicePath: ServicePath
  ) {
    super(client, domain, servicePath.ImageCategoryPath);
  }
}
