import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaModel } from 'app/models/EntityModels/Meta/MetaModel';
import { PageModel } from 'app/models/EntityModels/Page/PageModel';
import { MetaService } from 'app/services/meta.service';
import { PageService } from 'app/services/page.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-meta',
  templateUrl: './update-meta.component.html',
  styleUrls: ['./update-meta.component.scss']
})
export class UpdateMetaComponent implements OnInit {

  pageModels:PageModel[] = []
  metaModel:MetaModel
  updateMetaForm:FormGroup
  constructor(
    private metaService:MetaService,
    private pageService:PageService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createUpdateForm();
    this.getPages();
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getById(params["id"]);
      }
    })
  }

  createUpdateForm(){
    this.updateMetaForm = this.formBuilder.group({
      id:["",Validators.required],
      name:["",Validators.required],
      content:["",Validators.required],
      pageId:["",Validators.required]
    })
  }

  getPages(){
    this.pageService.GetAll().subscribe(response=>{
      this.pageModels = response.data;
    })
  }
  getById(query:any){
    this.metaService.GetById(query).subscribe(response=>{
      this.metaModel = response.data;
    })
  }

  add(){
    if(this.updateMetaForm.valid){
      let command = Object.assign(this.updateMetaForm.value);
      this.metaService.Update(command).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı !");
        setTimeout(()=>this.router.navigate(["admin/seo"]),1000);
      },responseError=>{
        this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
      })
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","Dikkat !");
    }
  }

}
