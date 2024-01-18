import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductCategoryModel } from "app/models/EntityModels/productCategory/ProductCategoryModel";
import { ProductCategoryService } from "app/services/product-category.service";
import { ProductService } from "app/services/product.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
  productAddForm: FormGroup;
  productCategories: ProductCategoryModel[] = [];
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createAddForm();
    this.getProductsCategory();
  }

  createAddForm() {
    this.productAddForm = this.formBuilder.group({
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

  add() {
    if (this.productAddForm.valid) {
      let command = Object.assign(this.productAddForm.value);
      this.productService.Add(command).subscribe(
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
