import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HomeModel } from "app/models/EntityModels/Home/HomeModel";
import { PartnerModel } from "app/models/EntityModels/Partner/PartnerModel";
import { HomeService } from "app/services/home.service";
import { PartnerService } from "app/services/partner.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-partner",
  templateUrl: "./partner.component.html",
  styleUrls: ["./partner.component.scss"],
})
export class PartnerComponent implements OnInit {
  colAddClass = "";
  partnerAddForm: FormGroup;
  sliderModels: PartnerModel[] = [];
  homeModels: HomeModel[] = [];
  constructor(
    private partnerService: PartnerService,
    private homeService: HomeService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createAddForm();
    this.getAll();
  }

  getAll() {
    this.partnerService.GetAll().subscribe((response) => {
      this.sliderModels = response.data;
    });
    this.homeService.GetAll().subscribe((response) => {
      this.homeModels = response.data;
    });
  }
  createAddForm() {
    this.partnerAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      uri: ["", Validators.required],
      homeId: ["", Validators.required],
    });
  }
  openAddColapse() {
    this.colAddClass = "show";
  }

  delete(command: any) {
    this.partnerService.Delete(command).subscribe(
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
    if (this.partnerAddForm.valid) {
      let command = Object.assign(this.partnerAddForm.value);
      this.partnerService.Add(command).subscribe(
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
