import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HomeModel } from "app/models/EntityModels/Home/HomeModel";
import { SliderModel } from "app/models/EntityModels/Slider/SliderModel";
import { HomeService } from "app/services/home.service";
import { SliderService } from "app/services/slider.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"],
})
export class SliderComponent implements OnInit {
  colAddClass = "";
  sliderAddForm: FormGroup;
  sliderModels: SliderModel[] = [];
  homeModels: HomeModel[] = [];
  constructor(
    private sliderService: SliderService,
    private homeService: HomeService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createAddForm();
    this.getAll();
  }

  getAll() {
    this.sliderService.GetAll().subscribe((response) => {
      this.sliderModels = response.data;
    });
    this.homeService.GetAll().subscribe((response) => {
      this.homeModels = response.data;
    });
  }
  createAddForm() {
    this.sliderAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      uri: ["", Validators.required],
      homeId: ["", Validators.required],
    });
  }
  openAddColapse() {
    this.colAddClass = "show";
  }

  delete(command: any) {
    this.sliderService.Delete(command).subscribe(
      (response) => {
        this.toastrService.show(response.message, "Başarılı !");
        this.getAll();
      },
      (responseErorr) => {
        this.toastrService.error(responseErorr.message, "Bir Hata Oluştu !");
      }
    );
  }
  add() {
    if (this.sliderAddForm.valid) {
      let command = Object.assign(this.sliderAddForm.value);
      this.sliderService.Add(command).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Başarılı !");
          this.getAll();
          this.colAddClass = "";
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
