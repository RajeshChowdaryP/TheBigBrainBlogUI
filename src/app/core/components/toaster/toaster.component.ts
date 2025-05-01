import { Component } from '@angular/core';
import { CommonService } from 'src/app/features/services/common.service';

@Component({
  selector: 'app-toaster',
  standalone: false,
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent {
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.showToast();
  }

  showToast() {
    if (this.commonService.toasterActions?.showToaster) {
      const toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container position-fixed bottom-0 start-50 translate-middle-x p-3';
      document.body.appendChild(toastContainer);

      const toast = document.createElement('div');
      toast.className = `toast align-items-center text-bg-${this.commonService.toasterActions?.toasterType} border-0 show`;
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'assertive');
      toast.setAttribute('aria-atomic', 'true');

      const toastBody = document.createElement('div');
      toastBody.className = 'd-flex';
      toastBody.innerHTML = `
      <div class="toast-body">
      ${this.commonService.toasterActions?.toasterMessage}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    `;

      toast.appendChild(toastBody);
      toastContainer.appendChild(toast);

      // Automatically remove the toast after a delay
      setTimeout(() => {
        this.commonService.toasterActions.showToaster = false;
        this.commonService.toasterActions.toasterMessage = '';
        toastContainer.remove();
      }, 3000);

    }
  }

}
