import { BaseEntity } from "../Common/BaseEntity";

export interface PhoneNumberModel extends BaseEntity{
    name:string
    phone:string
    footerId:string
}