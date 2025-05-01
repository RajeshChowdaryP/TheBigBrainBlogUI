import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { CommonService } from '../../services/common.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Use Angular's dependency injection to get an instance of AuthService
  const router = inject(Router); // Use Angular's dependency injection to get an instance of Router
  const cookieService = inject(CookieService); // Use Angular's dependency injection to get an instance of CookieService
  const commonService = inject(CommonService); // Use Angular's dependency injection to get an instance of CommonService

  let token = cookieService.get('Authorization'); // Get the token from cookies
  if (token && authService.getUser()) { // Check if the token exists and if the user is logged in
    token = token.replace('Bearer ', ''); // Remove 'Bearer ' prefix from the token
    const decodedToken: any = jwtDecode(token); // Decode the token to get user information install jwt-decode package npm install jwt-decode --save

    // Check if the token is expired
    const isExpired = decodedToken.exp * 1000 < new Date().getTime(); // Check if the token is expired convert exp to milliseconds and compare with current time
    if (isExpired) {
      commonService.toasterActions = { showToaster: true, toasterMessage: `Session expired!`, toasterType: 'danger' };
      // logout the user and redirect to login page
      authService.logout(); // Call the logout method in AuthService to clear user data
      return router.createUrlTree(['/Login'], { queryParams: { returnUrl: state.url } }); // Redirect to login page
    } else {
      // // Check if the user has the required role to access the route
      // if (authService.getUserRoles().includes('Writer')){
      //   return true; // Allow access to the route if the user has the required role
      // }
      // else{
      //   alert('Unauthorized access!'); // Show an alert if the user does not have the required role
      //   router.navigateByUrl(''); // Redirect to the previous page
      //   return false; // Deny access to the route
      // }

      // Get the allowed roles from the route data, default to ['Admin'] if no roles are specified
      const allowedRoles = route.data?.['roles'] || ['Writer'];
      const userRoles = authService.getUserRoles(); // Get the roles of the logged-in user

      // Check if the user has at least one of the allowed roles
      if (userRoles.some(role => allowedRoles.includes(role))) {
        return true; // Allow access to the route
      } else {
        commonService.toasterActions = { showToaster: true, toasterMessage: `Unauthorized access!`, toasterType: 'danger' };
        router.navigateByUrl(''); // Redirect to the home page
        return false; // Deny access to the route
      }
    }
  }
  else {
    commonService.toasterActions = { showToaster: true, toasterMessage: `Unauthorized access!`, toasterType: 'danger' };
    authService.logout(); // Call the logout method in AuthService to clear user data
    // If no token or user is logged in, redirect to login page
    return router.createUrlTree(['/Login'], { queryParams: { returnUrl: state.url } }); // Redirect to login page
  }
};
