import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DomainService {
 //local
  public domain:String = "https://localhost:7115/api/";
  //prodduction
  //public domain:String = "";
  constructor() {}
}
