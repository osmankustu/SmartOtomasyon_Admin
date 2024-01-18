import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductModel } from "app/models/EntityModels/product/ProductModel";
import { ProductCategoryModel } from "app/models/EntityModels/productCategory/ProductCategoryModel";
import { ProductCategoryService } from "app/services/product-category.service";
import { ProductService } from "app/services/product.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-update-product",
  templateUrl: "./update-product.component.html",
  styleUrls: ["./update-product.component.scss"],
})
export class UpdateProductComponent implements OnInit {
  productUpdateForm: FormGroup;
  productCategories: ProductCategoryModel[] = [];
  productModel: ProductModel;
  name: string;
  description: string;
  uri: string;
  tecDoc: string;
  userMan: string;
  constructor(
    private formBuilder: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createUpdateForm();
    this.getProductsCategory();
    this.activatedRoute.params.subscribe((params) => {
      if (params["id"]) {
        this.getByIdProduct(params["id"]);
      }
    });
  }

  createUpdateForm() {
    this.productUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      description: ["", Validators.required],
      imgUri: ["", Validators.required],
      techDocumentUri: ["", Validators.required],
      userManualUri: ["", Validators.required],
      productCategoryId: ["", Validators.required],
    });
  }

  getProductsCategory() {
    this.productCategoryService.GetAll().subscribe((response) => {
      this.productCategories = response.data;
    });
  }

  getByIdProduct(query: any) {
    this.productService.GetById(query).subscribe((response) => {
      this.productModel = response.data;
    });
  }

  update() {
    if (this.productUpdateForm.valid) {
      let command = Object.assign(this.productUpdateForm.value);
      this.productService.Update(command).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Başarılı !");
          setTimeout(() => this.router.navigate(["products"]), 1000);
        },
        (responseError) => {
          this.toastrService.error(responseError.message, "Bir Hata Oluştu !");
        }
      );
    } else {
      this.toastrService.warning("Formunuz Hatalıdır", "Dikkat !");
    }
  }
}
