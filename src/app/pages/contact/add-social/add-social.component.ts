import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FooterModel } from "app/models/EntityModels/footer/FooterModel";
import { FooterService } from "app/services/footer.service";
import { SocialService } from "app/services/social.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-social",
  templateUrl: "./add-social.component.html",
  styleUrls: ["./add-social.component.scss"],
})
export class AddSocialComponent implements OnInit {
  socialAddForm: FormGroup;
  footerModels: FooterModel[] = [];
  constructor(
    private socialService: SocialService,
    private footerService: FooterService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createAddForm();
    this.getAllFooter();
  }

  createAddForm() {
    this.socialAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      uri: ["", Validators.required],
      className:["",Validators.required],
      footerId: ["", Validators.required],
    });
  }

  getAllFooter() {
    this.footerService.GetAll().subscribe((response) => {
      this.footerModels = response.data;
    });
  }

  add() {
    if (this.socialAddForm.valid) {
      let command = Object.assign(this.socialAddForm.value);
      this.socialService.Add(command).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Başarılı !");
          setTimeout(() => this.router.navigate(["admin/contact"]), 1000);
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
