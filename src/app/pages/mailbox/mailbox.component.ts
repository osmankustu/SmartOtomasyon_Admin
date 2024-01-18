import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MailModel } from 'app/models/EntityModels/Mail/MailModel';
import { MailService } from 'app/services/mail.service';

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
    private activatedRoute:ActivatedRoute
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

}
