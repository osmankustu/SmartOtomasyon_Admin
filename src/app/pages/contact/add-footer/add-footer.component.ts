import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageModel } from 'app/models/EntityModels/Page/PageModel';
import { FooterService } from 'app/services/footer.service';
import { PageService } from 'app/services/page.service';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-footer',
  templateUrl: './add-footer.component.html',
  styleUrls: ['./add-footer.component.scss']
})
export class AddFooterComponent implements OnInit {

  footerAddForm:FormGroup
  pageModels:PageModel[]=[];
  constructor(
    private footerService:FooterService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router,
    private pageService:PageService
  ) { }

  ngOnInit(): void {
    this.createAddForm();
    this.getPages();
  }

  createAddForm(){
    this.footerAddForm  = this.formBuilder.group({
      name:["",Validators.required],
      adress:["",Validators.required],
      mail:["",Validators.required],
      pageId:["",Validators.required]
    })
  }

  getPages(){
    this.pageService.GetAll().subscribe(response=>{
      this.pageModels = response.data
    })
  }


  add(){
    if(this.footerAddForm.valid){
      let command = Object.assign(this.footerAddForm.value);
      this.footerService.Add(command).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı !");
        setTimeout(()=>this.router.navigate(["contact"]),1000);
      },responseError=>{
        this.toastrService.error(responseError.message,"Bir Hata Oluştu")
      })
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","Dikkat !");
    }
  }
}
