import { Injectable } from "@angular/core";
import { IBaseRepository } from "./IBaseRepository";
import { ListServiceResponse } from "app/models/ResponseModels/ListServiceResponse";
import { Observable } from "rxjs";
import { SingleServiceResponse } from "app/models/ResponseModels/SingleServiceResponse";
import { HttpClient } from "@angular/common/http";
import { DomainService } from "./domain.service";

@Injectable({
  providedIn: "root",
})
export class BaseService<T> implements IBaseRepository<T> {
  constructor(
    private httpClient: HttpClient,
    private domainService: DomainService,
    private _path: string
  ) {
    this.setValue(_path);
  }
  private _value: string;
  apiUri = this.domainService.domain + this.getValue();

  GetAll(): Observable<ListServiceResponse<T>> {
    return this.httpClient.get<ListServiceResponse<T>>(this.apiUri);
  }
  GetById(query: any): Observable<SingleServiceResponse<T>> {
    return this.httpClient.get<SingleServiceResponse<T>>(
      this.apiUri + "/" + query
    );
  }
  Update(command: any): Observable<SingleServiceResponse<String>> {
    return this.httpClient.put<SingleServiceResponse<String>>(
      this.apiUri,
      command
    );
  }
  Delete(command: any): Observable<SingleServiceResponse<String>> {
    return this.httpClient.delete<SingleServiceResponse<String>>(
      this.apiUri + "/" + command
    );
  }
  Add(command: any): Observable<SingleServiceResponse<String>> {
    return this.httpClient.post<SingleServiceResponse<String>>(
      this.apiUri,
      command
    );
  }

  private getValue(): string {
    return this._path;
  }
  private setValue(value: string) {
    this._path = value;
  }
}
