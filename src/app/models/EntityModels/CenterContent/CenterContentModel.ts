import { BaseEntity } from "../Common/BaseEntity"

export interface CenterContentModel extends BaseEntity{
    siteName:string
    title:string
    description:string
    homeId:string
}