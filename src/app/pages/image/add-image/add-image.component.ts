import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HomeModel } from "app/models/EntityModels/Home/HomeModel";
import { ImageCategoryModel } from "app/models/EntityModels/ImageCategory/ImageCategoryModel";
import { HomeService } from "app/services/home.service";
import { ImageCategoryService } from "app/services/image-category.service";
import { ImageService } from "app/services/image.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-image",
  templateUrl: "./add-image.component.html",
  styleUrls: ["./add-image.component.scss"],
})
export class AddImageComponent implements OnInit {
  uri: any;
  title: any;

  imageAddForm: FormGroup;
  imageCategories: ImageCategoryModel[] = [];
  homesModel:HomeModel[]=[];

  constructor(
    private imageService: ImageService,
    private imageCategoryService: ImageCategoryService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private homeService:HomeService
  ) {}

  ngOnInit(): void {
    this.createAddForm();
    this.getAllCategories();
    this.getAllHome();
  }

  createAddForm() {
    this.imageAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      uri: ["", Validators.required],
      imageCategoryId: ["", Validators.required],
      homeId:[""],
    });
  }

  getAllHome(){
    this.homeService.GetAll().subscribe(response=>{
      this.homesModel = response.data;
    })
  }

  getAllCategories() {
    this.imageCategoryService.GetAll().subscribe((response) => {
      this.imageCategories = response.data;
    });
  }

  add() {
    if (this.imageAddForm.valid) {
      let command = Object.assign(this.imageAddForm.value);
      this.imageService.Add(command).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Başarılı !");
          setTimeout(() => this.router.navigate(["admin/applicationImage"]), 1000);
        },
        (responseError) => {
          this.toastrService.error(responseError.messsage, "Bir Hata Oluştu !");
        }
      );
    } else {
      this.toastrService.warning("Formunuz Hatalıdır !", "Dikkat !");
    }
  }
}
