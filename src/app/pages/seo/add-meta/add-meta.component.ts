import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageModel } from 'app/models/EntityModels/Page/PageModel';
import { MetaService } from 'app/services/meta.service';
import { PageService } from 'app/services/page.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-meta',
  templateUrl: './add-meta.component.html',
  styleUrls: ['./add-meta.component.scss']
})
export class AddMetaComponent implements OnInit {

  pageModels:PageModel[] = []
  addMetaForm:FormGroup
  constructor(
    private metaService:MetaService,
    private pageService:PageService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createAddForm();
    this.getPages();
  }

  createAddForm(){
    this.addMetaForm = this.formBuilder.group({
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

  add(){
    if(this.addMetaForm.valid){
      let command = Object.assign(this.addMetaForm.value);
      this.metaService.Add(command).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı !");
        setTimeout(()=>this.router.navigate(["seo"]),1000);
      },responseError=>{
        this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
      })
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","Dikkat !");
    }
  }

}
