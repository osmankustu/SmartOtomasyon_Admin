import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MailModel } from 'app/models/EntityModels/Mail/MailModel';
import { MailService } from 'app/services/mail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss']
})
export class MailboxComponent implements OnInit {

  mails:MailModel[]=[];
  mail:MailModel;
  constructor(
    private mailService:MailService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      if(params["id"]){
        this.getByIdMail(params["id"]);
        this.getAllMail();
      }else{
        this.getAllMail();
      }
    })
  
  }

  getAllMail(){
    this.mailService.GetAll().subscribe(response=>{
      this.mails = response.data
    })
  }

  getByIdMail(query:any){
    this.mailService.GetById(query).subscribe(response=>{
      this.mail = response.data
    })
  }

  deleteMail(command:any){
    this.mailService.Delete(command).subscribe(response=>{
      this.toastrService.show(response.message,"Başarılı !");
      this.ngOnInit();
      this.mail = null;
    },responseError=>{
      this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
    })
  }

}
