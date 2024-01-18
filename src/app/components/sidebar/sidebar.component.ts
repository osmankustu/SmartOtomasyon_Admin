import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/services/Auth/auth.service";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "dashboard", title: "Kontorl Paneli", icon: "dashboard", class: ""},
  { path: "mailbox",title:"Gelen Kutusu",icon:"mailbox",class:""},
  { path: "visitors",title:"Ziyaretçi Listesi",icon:"person",class:""}
];

export const pageSettings: RouteInfo[] = [
  { path: "about", title: "Hakkında Sayfası", icon: "", class: "" },
  { path: "referance", title: "Referans Sayfası", icon: "", class: "" },
  { path: "contact", title: "Sosyal Linkler Ve İletşim", icon: "", class: "" },
  { path: "applicationImageCategory", title: "Uygulama Kategori Ayarları", icon: "", class: ""},
  { path: "applicationImage", title: "Uygulama Sayfası", icon: "", class: "" },
  {path : "products",title:"Ürün İşlemleri",icon:"",class:""},
  {path: "seo",title:"Seo Ve Site Genel Ayarlar",icon:"",class:""}
];

export const mainPageSettings:RouteInfo[]=[
  { path:'main',title:'Anasayfa',icon:'mainpage',class:''},
  { path:'main/slider',title:'Slayt İçeriği',icon:'',class:''},
  { path:'main/centerContent',title:'Orta Yazı İçeriği',icon:'',class:''},
  { path:'main/partner',title:'Partner İçeriği',icon:'',class:''},
  { path:'main/endContent',title:'Son Yazı İçeriği',icon:'',class:''},
]

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  pageSettings: any[];
  mainPageSettings:any[];
  name="";
  sureName;

  constructor(private authService:AuthService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.pageSettings = pageSettings.filter((i) => i);
    this.mainPageSettings = mainPageSettings.filter((m)=>m);
    this.getUser();
    
  }
  getUser(){
    this.name = localStorage.getItem("name");
    this.sureName = localStorage.getItem("surename")
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  exit(){
    this.authService.exit();
  }
}
