import { Injectable } from "@angular/core";
import { BaseService } from "./Common/base.service";
import { ProductCategoryModel } from "app/models/EntityModels/productCategory/ProductCategoryModel";
import { HttpClient } from "@angular/common/http";
import { DomainService } from "./Common/domain.service";
import { ServicePath } from "./base/ServicePath";

@Injectable({
  providedIn: "root",
})
export class ProductCategoryService extends BaseService<ProductCategoryModel> {
  constructor(
    private client: HttpClient,
    private domain: DomainService,
    path: ServicePath
  ) {
    super(client, domain, path.ProductCategoryPath);
  }
}
