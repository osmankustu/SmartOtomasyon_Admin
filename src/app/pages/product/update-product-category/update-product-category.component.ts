import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PageModel } from "app/models/EntityModels/Page/PageModel";
import { ProductCategoryModel } from "app/models/EntityModels/productCategory/ProductCategoryModel";
import { PageService } from "app/services/page.service";
import { ProductCategoryService } from "app/services/product-category.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-update-product-category",
  templateUrl: "./update-product-category.component.html",
  styleUrls: ["./update-product-category.component.scss"],
})
export class UpdateProductCategoryComponent implements OnInit {
  productCategoryUpdateForm: FormGroup;
  productCategoryModel: ProductCategoryModel;
  pageModels:PageModel[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pageService:PageService
  ) {}

  ngOnInit(): void {
    this.createUpdateForm();
    this.getPages();
    this.activatedRoute.params.subscribe((params) => {
      if (params["id"]) {
        this.getByIdProductCategory(params["id"]);
      }
    });
  }

  createUpdateForm() {
    this.productCategoryUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      pageId:["",Validators.required]
    });
  }

  getPages(){
    this.pageService.GetAll().subscribe(response=>{
      this.pageModels = response.data
    })
  }
  
  getByIdProductCategory(query: any) {
    this.productCategoryService.GetById(query).subscribe((response) => {
      this.productCategoryModel = response.data;
    });
  }

  update() {
    if (this.productCategoryUpdateForm.valid) {
      let command = Object.assign(this.productCategoryUpdateForm.value);
      this.productCategoryService.Update(command).subscribe(
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
