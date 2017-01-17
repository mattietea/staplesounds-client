import { Injectable } from '@angular/core';
import {isNullOrUndefined} from "util";

@Injectable()
export class UtilityService {

  constructor() { }

  getUrl(url: string, filter: Object): string {
    if (!isNullOrUndefined(filter)) {
      return `${url}?filter=${encodeURI(JSON.stringify(filter))}`;
    } else {
      return url;
    }
  }

}
