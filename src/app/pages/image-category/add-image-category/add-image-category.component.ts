import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PageModel } from "app/models/EntityModels/Page/PageModel";
import { ImageCategoryService } from "app/services/image-category.service";
import { PageService } from "app/services/page.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-image-category",
  templateUrl: "./add-image-category.component.html",
  styleUrls: ["./add-image-category.component.scss"],
})
export class AddImageCategoryComponent implements OnInit {
  categoryAddForm: FormGroup;
  pageModels:PageModel[]=[];
  constructor(
    private imageCategoryService: ImageCategoryService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private pageService:PageService
  ) {}

  ngOnInit(): void {
    this.createAddForm();
    this.getPages();
  }

  createAddForm() {
    this.categoryAddForm = this.formBuilder.group({
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
    if (this.categoryAddForm.valid) {
      let command = Object.assign(this.categoryAddForm.value);
      this.imageCategoryService.Add(command).subscribe((response) => {
        if (response.success) {
          this.toastrService.success(response.message, "Başarılı !");
          setTimeout(
            () => this.router.navigate(["admin/applicationImageCategory"]),
            1000
          );
        } else {
          this.toastrService.error(response.message, "Bir Hata Oluştu !");
        }
      });
    } else {
      this.toastrService.warning("Formunuz Hatalıdır.", "Dikkat !");
    }
  }
}
