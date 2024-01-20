import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PageModel } from "app/models/EntityModels/Page/PageModel";
import { DocumentCategoryService } from "app/services/document-category.service";
import { PageService } from "app/services/page.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-document-category",
  templateUrl: "./add-document-category.component.html",
  styleUrls: ["./add-document-category.component.scss"],
})
export class AddDocumentCategoryComponent implements OnInit {
  
  categoryAddForm:FormGroup
  pagesModel: PageModel[] = [];
  constructor(
    private categoryService: DocumentCategoryService,
    private pageService: PageService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createAddForm();
    this.getAllPage();
  }

  getAllPage() {
    this.pageService.GetAll().subscribe((response) => {
      this.pagesModel = response.data;
    });
  }

  createAddForm(){
    this.categoryAddForm = this.formBuilder.group({
      name:["",Validators.required],
      pageId:["",Validators.required]
    })
  }
  
  add(){
    if(this.categoryAddForm.valid){
      let command = Object.assign(this.categoryAddForm.value);
      this.categoryService.Add(command).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı !");
        setTimeout(()=>this.router.navigate(["admin/documents"]),1000);
      },responseError=>{
        this.toastrService.error(responseError.message,"Bir Hata Oluştu !")
      })
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","Dikkat !")
    }
  }
}
