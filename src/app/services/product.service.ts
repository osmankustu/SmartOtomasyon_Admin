import { Injectable } from "@angular/core";
import { BaseService } from "./Common/base.service";
import { ProductModel } from "app/models/EntityModels/product/ProductModel";
import { HttpClient } from "@angular/common/http";
import { DomainService } from "./Common/domain.service";
import { ServicePath } from "./base/ServicePath";

@Injectable({
  providedIn: "root",
})
export class ProductService extends BaseService<ProductModel> {
  constructor(
    private client: HttpClient,
    private domain: DomainService,
    path: ServicePath
  ) {
    super(client, domain, path.ProductPath);
  }
}
