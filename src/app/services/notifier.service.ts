import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotifierService {
  somethingUpdated$ = new Subject<void>();

  constructor() {}
}
