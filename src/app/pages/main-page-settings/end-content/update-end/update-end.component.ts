import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EndContentModel } from 'app/models/EntityModels/EndContent/EndContentModel';
import { HomeModel } from 'app/models/EntityModels/Home/HomeModel';
import { EndContentService } from 'app/services/end-content.service';
import { HomeService } from 'app/services/home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-end',
  templateUrl: './update-end.component.html',
  styleUrls: ['./update-end.component.scss']
})
export class UpdateEndComponent implements OnInit {
  
  contentUpdateForm: FormGroup;
  contentModel: EndContentModel;
  homeModels: HomeModel[] = [];
  constructor(
    private contentService: EndContentService,
    private homeService: HomeService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createUpdateForm();
    this.getAll();
    this.activatedRoute.params.subscribe((params) => {
      if (params["id"]) {
        this.getById(params["id"]);
      }
    });
  }

  getAll() {
    this.homeService.GetAll().subscribe((response) => {
      this.homeModels = response.data;
    });
  }
  
  createUpdateForm() {
    this.contentUpdateForm = this.formBuilder.group({
      id: ["", Validators.required],
      siteName: ["", Validators.required],
      title: ["", Validators.required],
      description: ["", Validators.required],
      homeId: ["", Validators.required],
    });
  }

  getById(query: any) {
    this.contentService.GetById(query).subscribe((response) => {
      this.contentModel = response.data;
    });
  }

  update() {
    if (this.contentUpdateForm.valid) {
      let command = Object.assign(this.contentUpdateForm.value);
      this.contentService.Update(command).subscribe(
        (response) => {
          this.toastrService.success(response.message, "Başarılı !");
          setTimeout(() => this.router.navigate(["main/endContent"]), 1000);
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
