import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentCategoryModel } from 'app/models/EntityModels/DocumentCategory/DocumentCategoryModel';
import { DocumentModel } from 'app/models/EntityModels/Documents/DocumentModel';
import { DocumentCategoryService } from 'app/services/document-category.service';
import { DocumentService } from 'app/services/document.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.scss']
})
export class UpdateDocumentComponent implements OnInit {

  categories:DocumentCategoryModel[]=[];
  document:DocumentModel
  documentUpdateForm:FormGroup

  constructor(
    private documentService: DocumentService,
    private documentCategoryService: DocumentCategoryService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.createUpdateForm();
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getByIdDocument(params["id"]);
      }
    })
  }

  getByIdDocument(query:any){
    this.documentService.GetById(query).subscribe(response=>{
      this.document = response.data
    })
  }

  getAllCategories(){
    this.documentCategoryService.GetAll().subscribe(response=>{
      this.categories = response.data
    })
  }

  createUpdateForm(){
    this.documentUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      name:["",Validators.required],
      uri:["",Validators.required],
      documentCategoryId:["",Validators.required]
    })
  }

  update(){
    if(this.documentUpdateForm.valid){
      let command = Object.assign(this.documentUpdateForm.value);
      this.documentService.Update(command).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı !");
        setTimeout(()=>this.router.navigate(["documents"]),1000);
      },responseError=>{
        this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
      })
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","Dikkat !")
    }
  }


}
