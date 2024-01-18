import { BaseEntity } from "../Common/BaseEntity";

export interface PartnerModel extends BaseEntity{
    name:string
    uri:string
    homeId:string
}