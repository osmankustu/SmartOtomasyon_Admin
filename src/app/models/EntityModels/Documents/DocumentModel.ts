import { BaseEntity } from "../Common/BaseEntity";

export interface DocumentModel extends BaseEntity{
    name:string
    uri:string
    documentCategoryId:string
}