import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeModel } from 'app/models/EntityModels/Home/HomeModel';
import { PageModel } from 'app/models/EntityModels/Page/PageModel';
import { HomeService } from 'app/services/home.service';
import { PageService } from 'app/services/page.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-page-settings',
  templateUrl: './main-page-settings.component.html',
  styleUrls: ['./main-page-settings.component.scss']
})
export class MainPageSettingsComponent implements OnInit {


  coladdClass="";
  HomeModels:HomeModel[]=[];
  homeAddForm:FormGroup;
  pageModels:PageModel[]=[];
  constructor(
    private homeService:HomeService,
    private pageService:PageService,
    private formbuilder:FormBuilder,
    private toastrService:ToastrService

  ) { }

  ngOnInit(): void {
    this.getAll();
    this.createAddForm();
  }

  createAddForm(){
    this.homeAddForm = this.formbuilder.group({
      name:["",Validators.required],
      pageId:["",Validators.required]
    })
  }
  

  getAll(){
    this.homeService.GetAll().subscribe(response=>{
      this.HomeModels = response.data
    })
    this.pageService.GetAll().subscribe(response=>{
      this.pageModels = response.data
    })
  }
  

  openAddColapse(){

    this.coladdClass ="show";
  }
  

  closeColapse(){
     this.coladdClass ="";
  }

  

  delete(command:any){
    this.homeService.Delete(command).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı !");
      this.getAll();
   },responseError=>{
      this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
   })
  }

  add(){
    if(this.homeAddForm.valid){
      let command = Object.assign(this.homeAddForm.value);
      this.homeService.Add(command).subscribe(response =>{
        this.toastrService.success(response.message,"Başarılı !");
        this.getAll()
        this.closeColapse()
      },responseError =>{
        this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
      })
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","Dikkat !");
    }
  }

  
}
