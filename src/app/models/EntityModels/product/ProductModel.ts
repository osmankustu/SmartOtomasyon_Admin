import { BaseEntity } from "../Common/BaseEntity";

export interface ProductModel extends BaseEntity{
    name:string
    imgUri:string
    description:string
    userManualUri:string
    techDocumentUri:string   
    productCategoryId:string
}