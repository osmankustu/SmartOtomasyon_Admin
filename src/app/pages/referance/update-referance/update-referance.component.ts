import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PageModel } from "app/models/EntityModels/Page/PageModel";
import { ReferanceModel } from "app/models/EntityModels/Referance/ReferanceModel";
import { PageService } from "app/services/page.service";
import { ReferanceService } from "app/services/referance.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-update-referance",
  templateUrl: "./update-referance.component.html",
  styleUrls: ["./update-referance.component.scss"],
})
export class UpdateReferanceComponent implements OnInit {
  referanceUpdateForm: FormGroup;
  referanceModel: ReferanceModel;
  pageModels: PageModel[] = [];
  constructor(
    private referanceService: ReferanceService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private pageService: PageService
  ) {}

  ngOnInit(): void {
    this.createUpdateForm();
    this.getPages();
    this.activatedRoute.params.subscribe((params) => {
      if (params["id"]) {
        this.getByIdReferance(params["id"]);
      } else {
      }
    });
  }

  createUpdateForm() {
    this.referanceUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      title: ["", Validators.required],
      description: ["", Validators.required],
      logoUri: ["", Validators.required],
      siteUri: ["", Validators.required],
      pageId: ["", Validators.required],
    });
  }

  getPages() {
    this.pageService.GetAll().subscribe((response) => {
      this.pageModels = response.data;
    });
  }

  getByIdReferance(query: any) {
    this.referanceService.GetById(query).subscribe((response) => {
      this.referanceModel = response.data;
    });
  }

  update() {
    if (this.referanceUpdateForm.valid) {
      var command = Object.assign(this.referanceUpdateForm.value);
      this.referanceService.Update(command).subscribe(
        (response) => {
          this.toastrService.success(response.message, "BAŞARILI");
          setTimeout(() => this.router.navigate(["admin/referance"]), 1000);
        },
        (responseError) => {
          this.toastrService.error(responseError.message, "Bir Hata Oluştu !");
        }
      );
    } else {
      this.toastrService.warning(
        "Formunuz Hatalıdır. Kontrol Edin !",
        "BAŞARISIZ"
      );
    }
  }
}
