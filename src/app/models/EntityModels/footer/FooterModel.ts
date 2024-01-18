import { BaseEntity } from "../Common/BaseEntity";

export interface FooterModel extends BaseEntity{
    name:string
    adress:string
    mail:string
    pageId:string
}