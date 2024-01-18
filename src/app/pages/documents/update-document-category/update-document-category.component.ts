import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentCategoryModel } from 'app/models/EntityModels/DocumentCategory/DocumentCategoryModel';
import { PageModel } from 'app/models/EntityModels/Page/PageModel';
import { DocumentCategoryService } from 'app/services/document-category.service';
import { PageService } from 'app/services/page.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-document-category',
  templateUrl: './update-document-category.component.html',
  styleUrls: ['./update-document-category.component.scss']
})
export class UpdateDocumentCategoryComponent implements OnInit {

  categoryModel:DocumentCategoryModel;
  categoryAddForm:FormGroup
  pagesModel: PageModel[] = [];
  constructor(
    private categoryService: DocumentCategoryService,
    private pageService: PageService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createUpdateForm();
    this.getAllPage();
    this.activatedRoute.params.subscribe(params =>{
      if(params["id"]){
        this.getByIdCategory(params["id"]);
      }
    })
  }

  getByIdCategory(query:any){
    this.categoryService.GetById(query).subscribe(response=>{
      this.categoryModel = response.data
    })
  }

  getAllPage() {
    this.pageService.GetAll().subscribe((response) => {
      this.pagesModel = response.data;
    });
  }

  createUpdateForm(){
    this.categoryAddForm = this.formBuilder.group({
     id:["",Validators.required],
      name:["",Validators.required],
      pageId:["",Validators.required]
    })
  }
  
  update(){
    if(this.categoryAddForm.valid){
      let command = Object.assign(this.categoryAddForm.value);
      this.categoryService.Update(command).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı !");
        setTimeout(()=>this.router.navigate(["documents"]),1000);
      },responseError=>{
        this.toastrService.error(responseError.message,"Bir Hata Oluştu !")
      })
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","Dikkat !")
    }
  }

}
