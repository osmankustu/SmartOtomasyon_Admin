import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterModel } from 'app/models/EntityModels/footer/FooterModel';
import { SocialLinkModel } from 'app/models/EntityModels/socialLinks/SocialLinkModel';
import { FooterService } from 'app/services/footer.service';
import { SocialService } from 'app/services/social.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-social',
  templateUrl: './update-social.component.html',
  styleUrls: ['./update-social.component.scss']
})
export class UpdateSocialComponent implements OnInit {

  socialUpdateForm: FormGroup;
  footerModels: FooterModel[] = [];
  socialModel:SocialLinkModel;
  constructor(
    private socialService: SocialService,
    private footerService: FooterService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createUpdateForm();
    this.getAllFooter();
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getByIdSocial(params["id"]);
      }
    })

  }

  createUpdateForm() {
    this.socialUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      name: ["", Validators.required],
      uri: ["", Validators.required],
      className:["",Validators.required],
      footerId: ["", Validators.required],
    });
  }

  getByIdSocial(query:any){
    this.socialService.GetById(query).subscribe(response=>{
      this.socialModel = response.data
    })
  }

  getAllFooter() {
    this.footerService.GetAll().subscribe((response) => {
      this.footerModels = response.data;
    });
  }

  update() {
    if (this.socialUpdateForm.valid) {
      let command = Object.assign(this.socialUpdateForm.value);
      this.socialService.Update(command).subscribe(
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
