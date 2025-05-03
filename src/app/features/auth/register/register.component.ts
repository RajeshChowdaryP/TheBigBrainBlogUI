import { Component } from '@angular/core';
import { RegistrationRequestInfo } from 'src/app/model/RegistrationRequestInfo';
import { CommonService } from '../../services/common.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user: RegistrationRequestInfo = {
      email: '',
      password: ''
    };
  
    showPassword: boolean = false;
    confirmPassword: string = '';

    constructor(private commonService: CommonService, private authService: AuthService) { }

    onSubmit() {
      switch (true) {
        case this.user.password !== this.confirmPassword:
          this.commonService.toasterActions = { showToaster: true, toasterMessage: `Passwords do not match. Please try again.`, toasterType: 'danger' };
          return;

        case this.user.email === '':
          this.commonService.toasterActions = { showToaster: true, toasterMessage: `Registration unsuccessful. Email is required.`, toasterType: 'danger' };
          return;

        case this.user.password === '':
          this.commonService.toasterActions = { showToaster: true, toasterMessage: `Registration unsuccessful. Password is required.`, toasterType: 'danger' };
          return;

        case this.confirmPassword === '':
          this.commonService.toasterActions = { showToaster: true, toasterMessage: `Registration unsuccessful. Confirm Password is required.`, toasterType: 'danger' };
          return;
      }
      
      this.authService.Register(this.user).subscribe({
        next: (response) => {
          this.commonService.toasterActions = { showToaster: true, toasterMessage: `Registration successful!`, toasterType: 'success' };
          console.log('Registration successful', response);
          // Redirect to the login page or another page
          // this.route.navigateByUrl('/login');
        }
        , error: (error) => {
          if (error.error.errors?.Message?.[0] === 'Email already exists') {
            this.commonService.toasterActions = { showToaster: true, toasterMessage: `Registration unsuccessful. Email already exists.`, toasterType: 'danger' };
          }
          else {
            this.commonService.toasterActions = { showToaster: true, toasterMessage: `An unexpected error occurred. Please try again later.`, toasterType: 'danger' };
          }
          console.error('Registration failed', error);
        }
      });
      // Handle form submission logic here
      console.log('Registration successful', this.user);
      // You can add your registration logic here, such as sending the data to a server
    }

}
