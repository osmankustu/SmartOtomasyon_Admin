import { Component, OnInit } from "@angular/core";
import { ProductModel } from "app/models/EntityModels/product/ProductModel";
import { ProductCategoryModel } from "app/models/EntityModels/productCategory/ProductCategoryModel";
import { AuthService } from "app/services/Auth/auth.service";
import { ProductCategoryService } from "app/services/product-category.service";
import { ProductService } from "app/services/product.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  categoryCount: number = 0;
  productCount: number = 0;
  productCategoriesModel: ProductCategoryModel[] = [];
  productsModel: ProductModel[] = [];

  constructor(
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private toastrService: ToastrService,
    private auth:AuthService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getProductCategory();
  }

  getProductCategory() {
    this.productCategoryService.GetAll().subscribe((response) => {
      this.productCategoriesModel = response.data;
      this.categoryCount = this.productCategoriesModel.length;
      this.auth.stateChecker();
    });
  }

  getProducts() {
    this.productService.GetAll().subscribe((response) => {
      this.productsModel = response.data;
      this.productCount = this.productsModel.length;
    });
  }

  deleteCategory(command: any) {
    this.productCategoryService.Delete(command).subscribe(
      (response) => {
        this.toastrService.show(response.message, "Silindi !");
        this.getProductCategory();
      },
      (responseError) => {
        this.toastrService.error(responseError.message, "Bir Hata Oluştu");
      }
    );
  }

  deleteProduct(command: any) {
    this.productService.Delete(command).subscribe(
      (response) => {
        this.toastrService.show(response.message, "Silindi !");
        this.getProducts();
      },
      (responseError) => {
        this.toastrService.error(responseError.message, "Bir Hata Oluştu !");
      }
    );
  }
}
