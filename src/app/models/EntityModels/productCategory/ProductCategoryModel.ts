import { BaseEntity } from "../Common/BaseEntity";
import { ProductModel } from "../product/ProductModel";

export interface ProductCategoryModel extends BaseEntity{
    name:string
    imgUri:string
    products:ProductModel[]
    pageId:string
}