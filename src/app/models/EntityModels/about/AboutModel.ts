import { BaseEntity } from "../Common/BaseEntity";

export interface AboutModel extends BaseEntity{
    title:string
    subTitle:string
    description:string
    imgUri:string
    pageId:string
    
}