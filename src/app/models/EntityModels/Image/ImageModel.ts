import { BaseEntity } from "../Common/BaseEntity";
import { ImageCategoryModel } from "../ImageCategory/ImageCategoryModel";

export interface ImageModel extends BaseEntity {
  name: string;
  uri: string;
  imageCategoryId: string;
  imageCategory: ImageCategoryModel;
  homeId:string
}
