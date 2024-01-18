import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterModel } from 'app/models/EntityModels/footer/FooterModel';
import { ContactService } from 'app/services/contact.service';
import { FooterService } from 'app/services/footer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-phone',
  templateUrl: './add-phone.component.html',
  styleUrls: ['./add-phone.component.scss']
})
export class AddPhoneComponent implements OnInit {
  phoneAddForm: FormGroup;
  footerModels: FooterModel[] = [];
  constructor(
    private contactService: ContactService,
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
    this.phoneAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      footerId: ["", Validators.required],
    });
  }

  getAllFooter() {
    this.footerService.GetAll().subscribe((response) => {
      this.footerModels = response.data;
    });
  }

  add() {
    if (this.phoneAddForm.valid) {
      let command = Object.assign(this.phoneAddForm.value);
      this.contactService.Add(command).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Başarılı !");
          setTimeout(() => this.router.navigate(["contact"]), 1000);
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
