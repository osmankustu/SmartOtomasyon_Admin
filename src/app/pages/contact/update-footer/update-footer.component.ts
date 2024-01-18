import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageModel } from 'app/models/EntityModels/Page/PageModel';
import { FooterModel } from 'app/models/EntityModels/footer/FooterModel';
import { FooterService } from 'app/services/footer.service';
import { PageService } from 'app/services/page.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-footer',
  templateUrl: './update-footer.component.html',
  styleUrls: ['./update-footer.component.scss']
})
export class UpdateFooterComponent implements OnInit {

  footerUpdateForm:FormGroup
  footerModel:FooterModel
  pageModels:PageModel[]=[];
  constructor(
    private footerService:FooterService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private pageService:PageService
  ) { }

  ngOnInit(): void {
    this.createUpdateForm();
    this.getPages();
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getByIdFooter(params["id"]);
      }
    })
  }

  createUpdateForm(){
    this.footerUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      name:["",Validators.required],
      adress:["",Validators.required],
      mail:["",Validators.required],
      pageId:["",Validators.required]
    })
  }

  getByIdFooter(query:any){
    this.footerService.GetById(query).subscribe(response=>{
      this.footerModel = response.data
    })
  }

  getPages(){
    this.pageService.GetAll().subscribe(response=>{
      this.pageModels = response.data
    })
  }

  update(){
    if(this.footerUpdateForm.valid){
      let command = Object.assign(this.footerUpdateForm.value);
      this.footerService.Update(command).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı !");
        setTimeout(()=>this.router.navigate(["contact"]),1000);
      },responseError=>{
        this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
      })
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","Dikkat !");
    }
  }
}
