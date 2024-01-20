import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterModel } from 'app/models/EntityModels/footer/FooterModel';
import { PhoneNumberModel } from 'app/models/EntityModels/phoneNumber/PhoneNumberModel';
import { ContactService } from 'app/services/contact.service';
import { FooterService } from 'app/services/footer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrls: ['./update-phone.component.scss']
})
export class UpdatePhoneComponent implements OnInit {

  phoneUpdateForm: FormGroup;
  footerModels: FooterModel[] = [];
  phoneModel:PhoneNumberModel;
  constructor(
    private contactService: ContactService,
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
    this.phoneUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      name: ["", Validators.required],
      phone: ["", Validators.required],
      footerId: ["", Validators.required],
    });
  }

  getByIdSocial(query:any){
    this.contactService.GetById(query).subscribe(response=>{
      this.phoneModel = response.data
    })
  }

  getAllFooter() {
    this.footerService.GetAll().subscribe((response) => {
      this.footerModels = response.data;
    });
  }

  update() {
    if (this.phoneUpdateForm.valid) {
      let command = Object.assign(this.phoneUpdateForm.value);
      this.contactService.Update(command).subscribe(
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
