import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageModel } from 'app/models/EntityModels/Page/PageModel';
import { PageService } from 'app/services/page.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.scss']
})
export class UpdatePageComponent implements OnInit {

  pageModel:PageModel
  updatePageForm:FormGroup
  constructor(
    private pageService:PageService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getById(params["id"]);
      }
    })
  }

  createUpdateForm(){
    this.updatePageForm = this.formBuilder.group({
      id:["",Validators.required],
      name:["",Validators.required],
   
    })
  }

  getById(query:any){
    this.pageService.GetById(query).subscribe(response=>{
      this.pageModel = response.data;
    })
  }

  update(){
    if(this.updatePageForm.valid){
      let command = Object.assign(this.updatePageForm.value);
      this.pageService.Update(command).subscribe(response=>{
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
