import {Injectable} from "@angular/core";
import {SessionService} from "./session.service";
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from "@angular/router";
import {Observable} from "rxjs";


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private _sessionService: SessionService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._sessionService.getUserSession().map(val => val.admin)
      .take(1)
      .do(auth => { if (!auth) {
          this._router.navigate(['recent']);
        }
      });
  }
}
