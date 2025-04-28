import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  showLoader: boolean = false;

  constructor() { }
}
