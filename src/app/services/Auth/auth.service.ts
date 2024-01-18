import { Injectable } from '@angular/core';
import { BaseService } from '../Common/base.service';
import { HttpClient } from '@angular/common/http';
import { DomainService } from '../Common/domain.service';
import { Observable } from 'rxjs';
import  jwt_decode  from 'jwt-decode';
import { SingleServiceResponse } from 'app/models/ResponseModels/SingleServiceResponse';
import { TokenModel } from 'app/models/EntityModels/Token/TokenModel';
import { RegisterModel } from 'app/models/EntityModels/Auth/RegisterModel';
import { LoginModel } from 'app/models/EntityModels/Auth/LoginModel';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export  class  AuthService  {
   timerRef = null
  expTime=null
  currentTime=null
  timeout =null
  constructor(private client:HttpClient,private domain:DomainService, private router:Router,private toastrService:ToastrService) { }

  login(command:LoginModel):Observable<SingleServiceResponse<TokenModel>>{
    return this.client.post<SingleServiceResponse<TokenModel>>(this.domain.domain+"Auth/login",command);
  }

  register(command:RegisterModel):Observable<SingleServiceResponse<string>>{
    return this.client.post<SingleServiceResponse<string>>(this.domain.domain+"Auth/register",command);
  }

  isAuthenticated(){
    let jwt = jwt_decode(localStorage.getItem("token"));
    this.expTime = (new Date(jwt["exp"]*1000)).getTime();
    this.currentTime = (new Date().getTime());
    this.timeout = this.expTime-this.currentTime;
    if(this.timeout >0){
      return true;
    }
    else{
      return false;
    }
  }

   stateChecker(){
    this.timerRef = setTimeout(()=>this.isAuthenticated(),this.timeout)
    if(this.isAuthenticated()==false){
      this.onExpire();
    }
    console.log("State Checked :",this.isAuthenticated())
  }

  onExpire(){
    this.router.navigate(['login']);
    this.toastrService.info("Oturum Süreniz Dolmuştur Tekrar Giriş Yapınız!!", "GİRİŞ YAPINIZ");
  }

  exit(){
    localStorage.clear();
    this.router.navigate(["login"])
  }

}
