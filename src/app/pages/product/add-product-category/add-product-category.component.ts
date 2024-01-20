import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PageModel } from "app/models/EntityModels/Page/PageModel";
import { PageService } from "app/services/page.service";
import { ProductCategoryService } from "app/services/product-category.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-product-category",
  templateUrl: "./add-product-category.component.html",
  styleUrls: ["./add-product-category.component.scss"],
})
export class AddProductCategoryComponent implements OnInit {
  productCategoryAddForm: FormGroup;
  pageModels:PageModel[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private toastrService: ToastrService,
    private router: Router,
    private pageService:PageService
  ) {}

  ngOnInit(): void {
    this.createAddForm();
    this.getPages();
  }

  createAddForm() {
    this.productCategoryAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      pageId:["",Validators.required]
    });
  }

  getPages(){
    this.pageService.GetAll().subscribe(response=>{
      this.pageModels = response.data
    })
  }

  add() {
    if (this.productCategoryAddForm.valid) {
      let command = Object.assign(this.productCategoryAddForm.value);
      this.productCategoryService.Add(command).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Başarılı !");
          setTimeout(() => this.router.navigate(["admin/products"]), 1000);
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
