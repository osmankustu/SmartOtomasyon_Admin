import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DocumentCategoryModel } from "app/models/EntityModels/DocumentCategory/DocumentCategoryModel";
import { DocumentCategoryService } from "app/services/document-category.service";
import { DocumentService } from "app/services/document.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-document",
  templateUrl: "./add-document.component.html",
  styleUrls: ["./add-document.component.scss"],
})
export class AddDocumentComponent implements OnInit {

  categories:DocumentCategoryModel[]=[];
  documentAddForm:FormGroup

  constructor(
    private documentService: DocumentService,
    private documentCategoryService: DocumentCategoryService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.createAddForm();
  }

  getAllCategories(){
    this.documentCategoryService.GetAll().subscribe(response=>{
      this.categories = response.data
    })
  }

  createAddForm(){
    this.documentAddForm = this.formBuilder.group({
      name:["",Validators.required],
      uri:["",Validators.required],
      documentCategoryId:["",Validators.required]
    })
  }

  add(){
    if(this.documentAddForm.valid){
      let command = Object.assign(this.documentAddForm.value);
      this.documentService.Add(command).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı !");
        setTimeout(()=> this.router.navigate(["/documents"]),1000);
      },responseError=>{
        this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
      })
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","Dikkat !")
    }
  }

  
}
