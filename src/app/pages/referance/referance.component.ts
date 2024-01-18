import { Component, OnInit } from '@angular/core';
import { ReferanceModel } from 'app/models/EntityModels/Referance/ReferanceModel';
import { AuthService } from 'app/services/Auth/auth.service';
import { ReferanceService } from 'app/services/referance.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-referance',
  templateUrl: './referance.component.html',
  styleUrls: ['./referance.component.scss']
})
export class ReferanceComponent implements OnInit {

  referanceModel:ReferanceModel[]=[]
  count:number=0;
  constructor(
    private referanceService:ReferanceService,
    private toastrService:ToastrService,
    private auth:AuthService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.referanceService.GetAll().subscribe(response=>{
      this.referanceModel = response.data
      this.count=this.referanceModel.length
      this.auth.stateChecker();
    })
  }

  delete(command:any){
    this.referanceService.Delete(command).subscribe(response=>{
      if(response.success){
        this.toastrService.show(response.message,"BAŞARILI");
        this.getAll();
      }else{
        this.toastrService.error("Bir Hata Oluştu !","BAŞARISIZ");
      }
    })
  }
}
