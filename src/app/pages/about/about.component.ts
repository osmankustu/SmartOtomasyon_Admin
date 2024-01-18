import { Component, OnInit } from '@angular/core';
import { AboutModel } from 'app/models/EntityModels/about/AboutModel';
import { AuthService } from 'app/services/Auth/auth.service';
import { AboutService } from 'app/services/about.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  count:number=0;
  aboutModel:AboutModel[]=[];
  constructor(
    private aboutService:AboutService,
    private toastrService:ToastrService,private auth:AuthService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.aboutService.GetAll().subscribe(response=>{
      this.auth.stateChecker();
      this.aboutModel = response.data;
      this.count = this.aboutModel.length
    })
  }

  delete(command:any){
    this.aboutService.Delete(command).subscribe(response=>{
      this.toastrService.show(response.message,"Başarılı !");
      this.getAll();
    },responseError=>{
      this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
    })
  }

}
