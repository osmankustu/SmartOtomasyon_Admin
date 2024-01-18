import { BaseEntity } from "../Common/BaseEntity";

export interface MailModel extends BaseEntity{
    nameSureName:string
    email:string
    message:string
    subject:string
    phone:string
}