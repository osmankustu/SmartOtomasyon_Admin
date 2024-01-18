import { Component, OnInit } from '@angular/core';
import { MetaModel } from 'app/models/EntityModels/Meta/MetaModel';
import { PageModel } from 'app/models/EntityModels/Page/PageModel';
import { AuthService } from 'app/services/Auth/auth.service';
import { MetaService } from 'app/services/meta.service';
import { PageService } from 'app/services/page.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss']
})
export class SeoComponent implements OnInit {
  pageCount=0;
  metaCount=0
  metaModels:MetaModel[]=[]
  pageModels:PageModel[]=[]
  filterText=""
  constructor(
    private metaService:MetaService,
    private pageService:PageService,
    private toastrService:ToastrService,
    private auth:AuthService
  ) { }

  ngOnInit(): void {
    this.getPage();
    this.getMeta();
  }

  getPage(){
    this.pageService.GetAll().subscribe(response=>{
      this.pageModels = response.data;
      this.pageCount = this.pageModels.length
      this.auth.stateChecker();
    })
  }

  getMeta(){
    this.metaService.GetAll().subscribe(response=>{
      this.metaModels = response.data;
      this.metaCount = this.metaModels.length
    })
  }

  deleteMeta(command:any){
    this.metaService.Delete(command).subscribe(response=>{
    this.toastrService.show(response.message,"Başarılı !");
    this.getMeta();
    },responseError=>{
      this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
    })
  }
  deletePage(command:any){
    this.pageService.Delete(command).subscribe(response=>{
      this.toastrService.show(response.message,"Başarılı !");
      this.getPage();
      },responseError=>{
        this.toastrService.error(responseError.message,"Bir Hata Oluştu !");
    })
  }

}
