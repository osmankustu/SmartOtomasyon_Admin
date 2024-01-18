import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { ReferanceComponent } from "app/pages/referance/referance.component";
import { AddReferanceComponent } from "app/pages/referance/add-referance/add-referance.component";
import { UpdateReferanceComponent } from "app/pages/referance/update-referance/update-referance.component";
import { ImageCategoryComponent } from "app/pages/image-category/image-category.component";
import { AddImageCategoryComponent } from "app/pages/image-category/add-image-category/add-image-category.component";
import { UpdateImageCategoryComponent } from "app/pages/image-category/update-image-category/update-image-category.component";
import { ImageComponent } from "app/pages/image/image.component";
import { AddImageComponent } from "app/pages/image/add-image/add-image.component";
import { UpdateImageComponent } from "app/pages/image/update-image/update-image.component";
import { AboutComponent } from "app/pages/about/about.component";
import { AddAboutComponent } from "app/pages/about/add-about/add-about.component";
import { UpdateAboutComponent } from "app/pages/about/update-about/update-about.component";
import { ContactComponent } from "app/pages/contact/contact.component";
import { AddFooterComponent } from "app/pages/contact/add-footer/add-footer.component";
import { AddSocialComponent } from "app/pages/contact/add-social/add-social.component";
import { AddPhoneComponent } from "app/pages/contact/add-phone/add-phone.component";
import { UpdateFooterComponent } from "app/pages/contact/update-footer/update-footer.component";
import { UpdateSocialComponent } from "app/pages/contact/update-social/update-social.component";
import { UpdatePhoneComponent } from "app/pages/contact/update-phone/update-phone.component";
import { ProductComponent } from "app/pages/product/product.component";
import { AddProductComponent } from "app/pages/product/add-product/add-product.component";
import { AddProductCategoryComponent } from "app/pages/product/add-product-category/add-product-category.component";
import { UpdateProductComponent } from "app/pages/product/update-product/update-product.component";
import { UpdateProductCategoryComponent } from "app/pages/product/update-product-category/update-product-category.component";
import { SeoComponent } from "app/pages/seo/seo.component";
import { AddMetaComponent } from "app/pages/seo/add-meta/add-meta.component";
import { AddPageComponent } from "app/pages/seo/add-page/add-page.component";
import { UpdateMetaComponent } from "app/pages/seo/update-meta/update-meta.component";
import { UpdatePageComponent } from "app/pages/seo/update-page/update-page.component";
import { MainPageSettingsComponent } from "app/pages/main-page-settings/main-page-settings.component";
import { UpdateMainComponent } from "app/pages/main-page-settings/update-main/update-main.component";
import { SliderComponent } from "app/pages/main-page-settings/slider/slider.component";
import { UpdateSliderComponent } from "app/pages/main-page-settings/slider/update-slider/update-slider.component";
import { PartnerComponent } from "app/pages/main-page-settings/partner/partner.component";
import { UpdatePartnerComponent } from "app/pages/main-page-settings/partner/update-partner/update-partner.component";
import { CenterContentComponent } from "app/pages/main-page-settings/center-content/center-content.component";
import { UpdateCenterComponent } from "app/pages/main-page-settings/center-content/update-center/update-center.component";
import { EndContentComponent } from "app/pages/main-page-settings/end-content/end-content.component";
import { UpdateEndComponent } from "app/pages/main-page-settings/end-content/update-end/update-end.component";
import { VisitorsComponent } from "app/pages/visitors/visitors.component";
import { MailboxComponent } from "app/pages/mailbox/mailbox.component";
import { DocumentsComponent } from "app/pages/documents/documents.component";
import { UpdateDocumentComponent } from "app/pages/documents/update-document/update-document.component";
import { UpdateDocumentCategoryComponent } from "app/pages/documents/update-document-category/update-document-category.component";
import { AddDocumentCategoryComponent } from "app/pages/documents/add-document-category/add-document-category.component";
import { AddDocumentComponent } from "app/pages/documents/add-document/add-document.component";
import { AddUserComponent } from "app/pages/add-user/add-user.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },

  //
  { path: "referance", component: ReferanceComponent },
  { path: "referance/add", component: AddReferanceComponent },
  { path: "referance/update/:id", component: UpdateReferanceComponent },
  //
  { path: "applicationImageCategory", component: ImageCategoryComponent },
  { path: "applicationImageCategory/add",component: AddImageCategoryComponent,},
  { path: "applicationImageCategory/update/:id",component: UpdateImageCategoryComponent,},
  //
  { path: "applicationImage", component: ImageComponent },
  { path: "applicationImage/add", component: AddImageComponent },
  { path: "applicationImage/update/:id", component: UpdateImageComponent },
  //
  { path: "about", component:AboutComponent},
  { path: "about/add", component:AddAboutComponent},
  { path: "about/update/:id", component:UpdateAboutComponent},
  //
  { path:"contact",component:ContactComponent},
  { path:"contact/add",component:AddFooterComponent},
  { path:"contact/addSocial",component:AddSocialComponent},
  { path:"contact/addPhone",component:AddPhoneComponent},
  { path:"contact/update/:id",component:UpdateFooterComponent},
  { path:"contact/update/social/:id",component:UpdateSocialComponent},
  { path:"contact/update/phone/:id",component:UpdatePhoneComponent},
  //
  { path:"products",component:ProductComponent},
  { path:"products/add",component:AddProductComponent},
  { path:"products/add/productsCategory",component:AddProductCategoryComponent},
  { path:"products/update/:id",component:UpdateProductComponent},
  { path:"products/update/productsCategory/:id",component:UpdateProductCategoryComponent},
  //
  { path:"seo",component:SeoComponent},
  { path:"seo/addMeta",component:AddMetaComponent},
  { path:"seo/addPage",component:AddPageComponent},
  { path:"seo/updateMeta/:id",component:UpdateMetaComponent},
  { path:"seo/updatePage/:id",component:UpdatePageComponent},
  //
  {path:'main',component:MainPageSettingsComponent},
  {path:'main/update/:id',component:UpdateMainComponent},
  {path:'main/slider',component:SliderComponent},
  {path:'main/slider/update/:id',component:UpdateSliderComponent},
  {path:'main/partner',component:PartnerComponent},
  {path:'main/partner/update/:id',component:UpdatePartnerComponent},
  {path:'main/centerContent',component:CenterContentComponent},
  {path:'main/centerContent/update/:id',component:UpdateCenterComponent},
  {path:'main/endContent',component:EndContentComponent},
  {path:'main/endContent/update/:id',component:UpdateEndComponent},
  {path:'visitors',component:VisitorsComponent},
  {path:'mailbox',component:MailboxComponent},
  {path:'mailbox/:id',component:MailboxComponent},
  {path:'documents',component:DocumentsComponent},
  {path:'documents/add',component:AddDocumentComponent},
  {path:'documents/update/:id',component:UpdateDocumentComponent},
  {path:'documents/addCategory',component:AddDocumentCategoryComponent},
  {path:'documents/updateCategory/:id',component:UpdateDocumentCategoryComponent},
  {path:'addUser',component:AddUserComponent}

  
];
