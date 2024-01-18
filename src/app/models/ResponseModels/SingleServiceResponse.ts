import { BaseResponse } from "./Common/BaseResponse";

export interface SingleServiceResponse<T> extends BaseResponse {
  data: T;
}
