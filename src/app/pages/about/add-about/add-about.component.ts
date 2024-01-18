import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageModel } from 'app/models/EntityModels/Page/PageModel';
import { AboutService } from 'app/services/about.service';
import { PageService } from 'app/services/page.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-about',
  templateUrl: './add-about.component.html',
  styleUrls: ['./add-about.component.scss']
})
export class AddAboutComponent implements OnInit {

  aboutAddForm:FormGroup
  title:string
  uri:string
  description:string
  pageModels:PageModel[]=[];
  constructor(
    private aboutService:AboutService,
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
    this.aboutAddForm = this.formBuilder.group({
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

  add(){
    if(this.aboutAddForm.valid){
      var command = Object.assign(this.aboutAddForm.value);
      this.aboutService.Add(command).subscribe(response=>{
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
