import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/authentication.service";


export const authGuard: CanActivateFn = () => {
  return inject(AuthService).isUserLoggedIn
    ? true
    : inject(Router).navigate(["login"]);
};
