import { BaseEntity } from "../Common/BaseEntity";
import { PageModel } from "../Page/PageModel";

export interface MetaModel extends BaseEntity{
    name:string
    content:string
    pageId:string
    page:PageModel
}