import { Component, OnInit } from "@angular/core";
import { DocumentCategoryModel } from "app/models/EntityModels/DocumentCategory/DocumentCategoryModel";
import { DocumentModel } from "app/models/EntityModels/Documents/DocumentModel";
import { DocumentCategoryService } from "app/services/document-category.service";
import { DocumentService } from "app/services/document.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.scss"],
})
export class DocumentsComponent implements OnInit {
  documentCategories: DocumentCategoryModel[] = [];
  documents: DocumentModel[] = [];
  cCount=0;
  dCount=0;
  constructor(
    private documentCategoryService: DocumentCategoryService,
    private documentService: DocumentService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getDocuments();
  }

  getCategories() {
    this.documentCategoryService.GetAll().subscribe((response) => {
      this.documentCategories = response.data;
      this.cCount = this.documentCategories.length
    });
  }

  getDocuments() {
    this.documentService.GetAll().subscribe((response) => {
      this.documents = response.data;
      this.dCount = this.documents.length
    });
  }

  deleteDocument(command:any){
    this.documentService.Delete(command).subscribe(response=>{
      this.toastrService.show(response.message,"Başarılı !");
      this.getDocuments();
    },responseError=>{
      this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
    })
  }
  deleteCategory(command:any){
    this.documentCategoryService.Delete(command).subscribe(response=>{
      this.toastrService.show(response.message,"Başarılı !");
      this.getCategories();
    },responseError=>{
      this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
    })
  }
}
