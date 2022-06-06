import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  // loader service to call loader in multiple components
  public static loader:Subject <any> = new Subject <any>();
  constructor() { }
}