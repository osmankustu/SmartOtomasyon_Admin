import { Component, OnInit } from "@angular/core";
import { ImageCategoryModel } from "app/models/EntityModels/ImageCategory/ImageCategoryModel";
import { AuthService } from "app/services/Auth/auth.service";
import { ImageCategoryService } from "app/services/image-category.service";
import { ImageService } from "app/services/image.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-image-category",
  templateUrl: "./image-category.component.html",
  styleUrls: ["./image-category.component.scss"],
})
export class ImageCategoryComponent implements OnInit {
  imageCategory: ImageCategoryModel[] = [];
  count: number = 0;
  constructor(
    private imageCategoryService: ImageCategoryService,
    private toastrService: ToastrService,private auth:AuthService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.imageCategoryService.GetAll().subscribe((response) => {
      this.imageCategory = response.data;
      this.auth.stateChecker();
    });
  }

  delete(command: any) {
    this.imageCategoryService.Delete(command).subscribe(
      (response) => {
        this.toastrService.show(response.message, "Başarılı !");
        this.getAll();
      },
      (responseError) => {
        this.toastrService.error(
          "Kategoriye Ait Resimler Olduğu için Silinemez Önce Bu Kategori Altındaki Resimi Siliniz",
          "BAŞARISIZ"
        );
      }
    );
  }
}
