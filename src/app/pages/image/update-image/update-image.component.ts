import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HomeModel } from "app/models/EntityModels/Home/HomeModel";
import { ImageModel } from "app/models/EntityModels/Image/ImageModel";
import { ImageCategoryModel } from "app/models/EntityModels/ImageCategory/ImageCategoryModel";
import { HomeService } from "app/services/home.service";
import { ImageCategoryService } from "app/services/image-category.service";
import { ImageService } from "app/services/image.service";

import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-update-image",
  templateUrl: "./update-image.component.html",
  styleUrls: ["./update-image.component.scss"],
})
export class UpdateImageComponent implements OnInit {
  uri: any;
  title: any;
  imageModel: ImageModel;
  imageUpdateForm: FormGroup;
  imageCategories: ImageCategoryModel[] = [];
  homesModel:HomeModel[]=[];

  constructor(
    private imageService: ImageService,
    private imageCategoryService: ImageCategoryService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private homeService:HomeService
  ) {}

  ngOnInit(): void {
    this.createUpdateForm();
    this.getAllCategories();
    this.getAllHome();
    this.activatedRoute.params.subscribe((params) => {
      if (params["id"]) {
        this.getById(params["id"]);
      }
    });
  }

  getAllHome(){
    this.homeService.GetAll().subscribe(response=>{
      this.homesModel = response.data;
    })
  }

  createUpdateForm() {
    this.imageUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      uri: ["", Validators.required],
      imageCategoryId: ["", Validators.required],
      homeId:[""],
    });
  }

  getById(query: any) {
    this.imageService.GetById(query).subscribe((response) => {
      this.imageModel = response.data;
    });
  }

  getAllCategories() {
    this.imageCategoryService.GetAll().subscribe((response) => {
      this.imageCategories = response.data;
    });
  }

  update() {
    if (this.imageUpdateForm.valid) {
      let command = Object.assign(this.imageUpdateForm.value);
      this.imageService.Update(command).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Başarılı !");
          setTimeout(() => this.router.navigate(["applicationImage"]), 1000);
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
