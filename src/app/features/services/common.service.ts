import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  showLoader: boolean = false;
  toasterActions: {
    showToaster: boolean,
    toasterMessage: string,
    toasterType: string // success, danger, warning, info
  } = {showToaster: false, toasterMessage: '', toasterType: ''};

    constructor() { }
}
