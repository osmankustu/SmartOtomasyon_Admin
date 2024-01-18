import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageModel } from 'app/models/EntityModels/Page/PageModel';
import { AboutModel } from 'app/models/EntityModels/about/AboutModel';
import { AboutService } from 'app/services/about.service';
import { PageService } from 'app/services/page.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-about',
  templateUrl: './update-about.component.html',
  styleUrls: ['./update-about.component.scss']
})
export class UpdateAboutComponent implements OnInit {

  aboutUpdateForm:FormGroup
  aboutModel:AboutModel;
  title:string;
  uri:string;
  description:string;
  pageModels:PageModel[]=[];
  constructor(
    private aboutService:AboutService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router,
    private pageService:PageService
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
    this.aboutUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      title:["",Validators.required],
      description:["",Validators.required],
      imgUri:["",Validators.required],
      pageId:["",Validators.required]
    })
  }

  getPages(){
    this.pageService.GetAll().subscribe(response=>{
      this.pageModels = response.data
    })
  }
  getById(query:any){
    this.aboutService.GetById(query).subscribe(response=>{
      this.aboutModel = response.data
      console.log(this.aboutModel)
    })
  }

  update(){
    if(this.aboutUpdateForm.valid){
      let command = Object.assign(this.aboutUpdateForm.value);
      this.aboutService.Update(command).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı !");
        setTimeout(()=>this.router.navigate(["about"]),1000);
      },responseError=>{
        this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
      })
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","Dikkat !")
    }
  }

}
