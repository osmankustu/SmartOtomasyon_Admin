import { BaseEntity } from "../Common/BaseEntity";

export interface ReferanceModel extends BaseEntity {
  title: string;
  description: string;
  logoUri: string;
  siteUri: string;
  pageId:string
}
