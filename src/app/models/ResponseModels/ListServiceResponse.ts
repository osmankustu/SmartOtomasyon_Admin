import { BaseResponse } from "./Common/BaseResponse";

export interface ListServiceResponse<T> extends BaseResponse {
  data: T[];
}
