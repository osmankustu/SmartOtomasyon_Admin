import { ListServiceResponse } from "app/models/ResponseModels/ListServiceResponse";
import { SingleServiceResponse } from "app/models/ResponseModels/SingleServiceResponse";
import { Observable } from "rxjs";

export interface IBaseRepository<T> {
  GetAll(): Observable<ListServiceResponse<T>>;
  GetById(query: any): Observable<SingleServiceResponse<T>>;
  Delete(command: any): Observable<SingleServiceResponse<String>>;
  Add(command: any): Observable<SingleServiceResponse<String>>;
  Update(comman: any): Observable<SingleServiceResponse<String>>;
}
