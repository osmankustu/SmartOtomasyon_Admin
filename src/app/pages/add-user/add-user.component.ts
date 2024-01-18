import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userAddForm:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createUserAddForm();
  }

  createUserAddForm(){
    this.userAddForm = this.formBuilder.group({
      email:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      password:["",Validators.required]
    })
  }

  add(){
    if(this.userAddForm.valid){
      let command = Object.assign(this.userAddForm.value);
      this.authService.register(command).subscribe(resposne=>{
        this.toastrService.success(resposne.message,"Başarılı !");
      },responseError=>{
        this.toastrService.error(responseError.message,"Bir Hata Oluştu!");
      })
    }else{
      this.toastrService.warning("Formunuz Hatalıdır !","Dikkat !");
    }
  }

}
