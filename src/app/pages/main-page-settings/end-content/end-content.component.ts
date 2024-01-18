import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndContentModel } from 'app/models/EntityModels/EndContent/EndContentModel';
import { HomeModel } from 'app/models/EntityModels/Home/HomeModel';
import { EndContentService } from 'app/services/end-content.service';
import { HomeService } from 'app/services/home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-end-content',
  templateUrl: './end-content.component.html',
  styleUrls: ['./end-content.component.scss']
})
export class EndContentComponent implements OnInit {

  colAddClass = "";
  contentAddForm: FormGroup;
  contentModels: EndContentModel[] = [];
  homeModels: HomeModel[] = [];
  constructor(
    private contentService: EndContentService,
    private homeService: HomeService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createAddForm();
    this.getAll();
  }

  getAll() {
    this.contentService.GetAll().subscribe((response) => {
      this.contentModels = response.data;
    });
    this.homeService.GetAll().subscribe((response) => {
      this.homeModels = response.data;
    });
  }
  createAddForm() {
    this.contentAddForm = this.formBuilder.group({
      siteName: ["", Validators.required],
      title: ["", Validators.required],
      description: ["", Validators.required],
      homeId: ["", Validators.required],
    });
  }
  openAddColapse() {
    this.colAddClass = "show";
  }

  delete(command: any) {
    this.contentService.Delete(command).subscribe(
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
    if (this.contentAddForm.valid) {
      let command = Object.assign(this.contentAddForm.value);
      this.contentService.Add(command).subscribe(
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
