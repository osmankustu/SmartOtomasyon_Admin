import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeModel } from 'app/models/EntityModels/Home/HomeModel';
import { SliderModel } from 'app/models/EntityModels/Slider/SliderModel';
import { HomeService } from 'app/services/home.service';
import { SliderService } from 'app/services/slider.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-slider',
  templateUrl: './update-slider.component.html',
  styleUrls: ['./update-slider.component.scss']
})
export class UpdateSliderComponent implements OnInit {
  homeModels:HomeModel[]=[];
  sliderUpdateForm:FormGroup
  sliderModel:SliderModel

  constructor(
    private homeService:HomeService,
    private sliderService:SliderService,
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
    this.sliderService.GetById(command).subscribe(response=>{
      this.sliderModel = response.data
    })
  }

  createUpdateForm(){
    this.sliderUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      name:["",Validators.required],
      uri:["",Validators.required],
      homeId:["",Validators.required]
    })
  }

  update(){
    if(this.sliderUpdateForm.valid){
      let command = Object.assign(this.sliderUpdateForm.value);
      this.sliderService.Update(command).subscribe(response =>{
        this.toastrService.success(response.message,"Başarılı !");
        setTimeout(()=>this.router.navigate(["main/slider"]),1000)
      },responseError =>{
        this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
      })
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","Dikkat !");
    }
  }

}
