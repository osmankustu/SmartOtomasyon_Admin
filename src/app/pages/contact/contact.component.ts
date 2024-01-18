import { Component, OnInit } from '@angular/core';
import { FooterModel } from 'app/models/EntityModels/footer/FooterModel';
import { PhoneNumberModel } from 'app/models/EntityModels/phoneNumber/PhoneNumberModel';
import { SocialLinkModel } from 'app/models/EntityModels/socialLinks/SocialLinkModel';
import { AuthService } from 'app/services/Auth/auth.service';
import { ContactService } from 'app/services/contact.service';
import { FooterService } from 'app/services/footer.service';
import { SocialService } from 'app/services/social.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  visible:boolean=true;

  footercount=0
  socialcount=0;
  phonecount=0;

  footerModel:FooterModel[]=[];
  socialModel:SocialLinkModel[]=[];
  contactModel:PhoneNumberModel[]=[]
  constructor(
    private socialService:SocialService,
    private contactService:ContactService,
    private footerService:FooterService,
    private toastrService:ToastrService,
    private auth:AuthService
  ) { }

  ngOnInit(): void {
    this.getAllFooter();
    this.getAllSocial();
    this.getAllContact();
  }

  getAllSocial(){
    this.socialService.GetAll().subscribe(response=>{
      this.socialModel = response.data
      this.auth.stateChecker();
    })
  }

  getAllContact(){
    this.contactService.GetAll().subscribe(response=>{
      this.contactModel = response.data
    })
  }

  getAllFooter(){
    this.footerService.GetAll().subscribe(response=>{
      this.footerModel = response.data
    })
  }

  deleteSocial(command:any){
    this.socialService.Delete(command).subscribe(response=>{
      this.toastrService.show(response.message,"Başarılı !")
      this.getAllSocial();
    },responseError=>{
      this.toastrService.error(responseError.message,"Bir Hata Oluştu !")
    })
  }
  deleteFooter(command:any){
    this.footerService.Delete(command).subscribe(response=>{
      this.toastrService.show(response.message,"Başarılı !")
      this.getAllFooter();
    },responseError=>{
      this.toastrService.error(responseError.message,"Bir Hata Oluştu !")
    })
  }
  deleteContact(command:any){
    this.contactService.Delete(command).subscribe(response=>{
      this.toastrService.show(response.message,"Başarılı !")
      this.getAllContact();
    },responseError=>{
      this.toastrService.error(responseError.message,"Bir Hata Oluştu !")
    })
  }
}
