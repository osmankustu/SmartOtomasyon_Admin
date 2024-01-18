import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeModel } from 'app/models/EntityModels/Home/HomeModel';
import { PartnerModel } from 'app/models/EntityModels/Partner/PartnerModel';
import { HomeService } from 'app/services/home.service';
import { PartnerService } from 'app/services/partner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-partner',
  templateUrl: './update-partner.component.html',
  styleUrls: ['./update-partner.component.scss']
})
export class UpdatePartnerComponent implements OnInit {

  homeModels:HomeModel[]=[];
  partnerUpdateForm:FormGroup
  partnerModel:PartnerModel

  constructor(
    private homeService:HomeService,
    private partnerService:PartnerService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private actvatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createUpdateForm()
    this.getAll();
    this.actvatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getById(params["id"]);
      }
    })
  }

  getAll(){
    this.homeService.GetAll().subscribe(response=>{
      this.homeModels =response.data;
    })
  }

  getById(command:any){
    this.partnerService.GetById(command).subscribe(response=>{
      this.partnerModel = response.data
    })
  }

  createUpdateForm(){
    this.partnerUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      name:["",Validators.required],
      uri:["",Validators.required],
      homeId:["",Validators.required]
    })
  }

  update(){
    if(this.partnerUpdateForm.valid){
      let command = Object.assign(this.partnerUpdateForm.value);
      this.partnerService.Update(command).subscribe(response =>{
        this.toastrService.success(response.message,"Başarılı !");
        setTimeout(()=>this.router.navigate(["main/partner"]),1000)
      },responseError =>{
        this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
      })
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","Dikkat !");
    }
  }

}
