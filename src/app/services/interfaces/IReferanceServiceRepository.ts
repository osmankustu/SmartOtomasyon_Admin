import { Observable } from "rxjs";
import { IBaseRepository } from "../Common/IBaseRepository";
import { ListServiceResponse } from "app/models/ResponseModels/ListServiceResponse";

export interface IReferanceServiceRepository<T> extends IBaseRepository<T> {}
