import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ImageCategoryModel } from "app/models/EntityModels/ImageCategory/ImageCategoryModel";
import { PageModel } from "app/models/EntityModels/Page/PageModel";
import { ImageCategoryService } from "app/services/image-category.service";
import { PageService } from "app/services/page.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-update-image-category",
  templateUrl: "./update-image-category.component.html",
  styleUrls: ["./update-image-category.component.scss"],
})
export class UpdateImageCategoryComponent implements OnInit {
  imageCategoryModel: ImageCategoryModel;
  categoryUpdateForm: FormGroup;
  pageModels:PageModel[]=[];

  constructor(
    private imageCategoryService: ImageCategoryService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private pageService:PageService
  ) {}

  ngOnInit(): void {
    this.createUpdateForm();
    this.getPages();
    this.activatedRoute.params.subscribe((params) => {
      if (params["id"]) {
        this.getById(params["id"]);
      }
    });
  }

  createUpdateForm() {
    this.categoryUpdateForm = this.formBuilder.group({
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

  getById(query: any) {
    this.imageCategoryService.GetById(query).subscribe((response) => {
      this.imageCategoryModel = response.data;
    });
  }

  update() {
    if (this.categoryUpdateForm.valid) {
      let command = Object.assign(this.categoryUpdateForm.value);
      this.imageCategoryService.Update(command).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Başarılı !");
          setTimeout(
            () => this.router.navigate(["applicationImageCategory"]),
            1000
          );
        },
        (responseError) => {
          this.toastrService.error(responseError.message, "Bir Hata Oluştu !");
        }
      );
    } else {
      this.toastrService.warning("Formunuz Hatalıdır !", "Dikkat !");
    }
  }
}
