import { BaseEntity } from "../Common/BaseEntity";

export interface SocialLinkModel extends BaseEntity{
    name:string
    uri:string
    footerId:string
}