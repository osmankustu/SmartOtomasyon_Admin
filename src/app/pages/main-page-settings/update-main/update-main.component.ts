import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeModel } from 'app/models/EntityModels/Home/HomeModel';
import { PageModel } from 'app/models/EntityModels/Page/PageModel';
import { HomeService } from 'app/services/home.service';
import { PageService } from 'app/services/page.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-main',
  templateUrl: './update-main.component.html',
  styleUrls: ['./update-main.component.scss']
})
export class UpdateMainComponent implements OnInit {

  homeUpdateForm:FormGroup
  pageModels:PageModel[]=[];
  homeModel:HomeModel;
  constructor(
    private formbuilder:FormBuilder,
    private homeService:HomeService,
    private pageService:PageService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createUpdateForm();
    this.getAll();
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getById(params["id"]);
      }
    })
  }

  getById(command:any){
    this.homeService.GetById(command).subscribe(response =>{
      this.homeModel = response.data
    })
  }

  getAll(){
    this.pageService.GetAll().subscribe(response=>{
      this.pageModels = response.data
    })
  }

  createUpdateForm(){
    this.homeUpdateForm = this.formbuilder.group({
      id:["",Validators.required],
      name:["",Validators.required],
      pageId:["",Validators.required]
    })
  }

  update(){
    if(this.homeUpdateForm.valid){
      let command = Object.assign(this.homeUpdateForm.value);
      this.homeService.Update(command).subscribe(response =>{
        this.toastrService.success(response.message,"Başarılı !");
        setTimeout(()=>this.router.navigate(["main"]),1000);
      },responseError =>{
        this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
      })
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","Dikkat !");
    }
  }

}
