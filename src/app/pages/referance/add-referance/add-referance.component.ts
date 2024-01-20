import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageModel } from 'app/models/EntityModels/Page/PageModel';
import { PageService } from 'app/services/page.service';
import { ReferanceService } from 'app/services/referance.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-referance',
  templateUrl: './add-referance.component.html',
  styleUrls: ['./add-referance.component.scss']
})
export class AddReferanceComponent implements OnInit {
  referanceAddForm:FormGroup
  pageModels:PageModel[]=[];
  constructor(
    private referanceService:ReferanceService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private router:Router,
    private pageService:PageService
  ) { }

  ngOnInit(): void {
    this.creareAddForm();
    this.getPages();
  }

  creareAddForm(){
    this.referanceAddForm = this.formBuilder.group({
      title:["",Validators.required],
      description:["",Validators.required],
      logoUri:["",Validators.required],
      siteUri:["",Validators.required],
      pageId:["",Validators.required]
    })
  }

  getPages(){
    this.pageService.GetAll().subscribe(response=>{
      this.pageModels = response.data
    })
  }

  add(){
    if(this.referanceAddForm.valid){
      let command = Object.assign(this.referanceAddForm.value);
      this.referanceService.Add(command).subscribe(response=>{
        if(response.success){
          this.toastrService.success(response.message,"BAŞARILI");
          setTimeout(()=>this.router.navigate(["admin/referance"]),1000);
        }
      })
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","BAŞARISIZ");
    }
  }
}
