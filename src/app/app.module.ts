import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ReferanceComponent } from './pages/referance/referance.component';
import { AddReferanceComponent } from './pages/referance/add-referance/add-referance.component';
import { UpdateReferanceComponent } from './pages/referance/update-referance/update-referance.component';
import {ToastrModule} from 'ngx-toastr';
import { ImageCategoryComponent } from './pages/image-category/image-category.component';
import { AddImageCategoryComponent } from './pages/image-category/add-image-category/add-image-category.component';
import { UpdateImageCategoryComponent } from './pages/image-category/update-image-category/update-image-category.component';
import { ImageComponent } from './pages/image/image.component';
import { AddImageComponent } from './pages/image/add-image/add-image.component';
import { UpdateImageComponent } from './pages/image/update-image/update-image.component';
import { BaseService } from './services/Common/base.service';
import { ServicePath } from './services/base/ServicePath';
import { NgSelectModule } from '@ng-select/ng-select';
import { AboutComponent } from './pages/about/about.component';
import { AddAboutComponent } from './pages/about/add-about/add-about.component';
import { UpdateAboutComponent } from './pages/about/update-about/update-about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AddSocialComponent } from './pages/contact/add-social/add-social.component';
import { AddPhoneComponent } from './pages/contact/add-phone/add-phone.component';
import { AddFooterComponent } from './pages/contact/add-footer/add-footer.component';
import { UpdateFooterComponent } from './pages/contact/update-footer/update-footer.component';
import { UpdateSocialComponent } from './pages/contact/update-social/update-social.component';
import { UpdatePhoneComponent } from './pages/contact/update-phone/update-phone.component';
import { ProductComponent } from './pages/product/product.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';
import { UpdateProductComponent } from './pages/product/update-product/update-product.component';
import { AddProductCategoryComponent } from './pages/product/add-product-category/add-product-category.component';
import { UpdateProductCategoryComponent } from './pages/product/update-product-category/update-product-category.component';
import { SeoComponent } from './pages/seo/seo.component';
import { AddMetaComponent } from './pages/seo/add-meta/add-meta.component';
import { AddPageComponent } from './pages/seo/add-page/add-page.component';
import { UpdateMetaComponent } from './pages/seo/update-meta/update-meta.component';
import { UpdatePageComponent } from './pages/seo/update-page/update-page.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './services/Auth/auth.interceptor';
import { MainPageSettingsComponent } from './pages/main-page-settings/main-page-settings.component';
import { UpdateMainComponent } from './pages/main-page-settings/update-main/update-main.component';
import { SliderComponent } from './pages/main-page-settings/slider/slider.component';
import { UpdateSliderComponent } from './pages/main-page-settings/slider/update-slider/update-slider.component';
import { PartnerComponent } from './pages/main-page-settings/partner/partner.component';
import { UpdatePartnerComponent } from './pages/main-page-settings/partner/update-partner/update-partner.component';
import { CenterContentComponent } from './pages/main-page-settings/center-content/center-content.component';
import { EndContentComponent } from './pages/main-page-settings/end-content/end-content.component';
import { UpdateCenterComponent } from './pages/main-page-settings/center-content/update-center/update-center.component';
import { UpdateEndComponent } from './pages/main-page-settings/end-content/update-end/update-end.component';
import { VisitorsComponent } from './pages/visitors/visitors.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { MailboxComponent } from './pages/mailbox/mailbox.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { UpdateDocumentComponent } from './pages/documents/update-document/update-document.component';
import { AddDocumentCategoryComponent } from './pages/documents/add-document-category/add-document-category.component';
import { UpdateDocumentCategoryComponent } from './pages/documents/update-document-category/update-document-category.component';
import { AddDocumentComponent } from './pages/documents/add-document/add-document.component';
import { MetaSerchPipe } from './pipes/meta-serch.pipe';
import { AddUserComponent } from './pages/add-user/add-user.component';





@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    }),
    NgSelectModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ReferanceComponent,
    AddReferanceComponent,
    UpdateReferanceComponent,
    ImageCategoryComponent,
    AddImageCategoryComponent,
    UpdateImageCategoryComponent,
    ImageComponent,
    AddImageComponent,
    UpdateImageComponent,
    AboutComponent,
    AddAboutComponent,
    UpdateAboutComponent,
    ContactComponent,
    AddSocialComponent,
    AddPhoneComponent,
    AddFooterComponent,
    UpdateFooterComponent,
    UpdateSocialComponent,
    UpdatePhoneComponent,
    ProductComponent,
    AddProductComponent,
    UpdateProductComponent,
    AddProductCategoryComponent,
    UpdateProductCategoryComponent,
    SeoComponent,
    AddMetaComponent,
    AddPageComponent,
    UpdateMetaComponent,
    UpdatePageComponent,
    LoginComponent,
    MainPageSettingsComponent,
    UpdateMainComponent,
    SliderComponent,
    UpdateSliderComponent,
    PartnerComponent,
    UpdatePartnerComponent,
    CenterContentComponent,
    EndContentComponent,
    UpdateCenterComponent,
    UpdateEndComponent,
    VisitorsComponent,
    CustomDatePipe,
    MailboxComponent,
    DocumentsComponent,
    UpdateDocumentComponent,
    AddDocumentCategoryComponent,
    UpdateDocumentCategoryComponent,
    AddDocumentComponent,
    MetaSerchPipe,
    AddUserComponent,
   
    

  ],
  providers: [BaseService,ServicePath ,{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor , multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
