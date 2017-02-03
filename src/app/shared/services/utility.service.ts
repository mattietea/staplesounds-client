import {Injectable} from '@angular/core';
import {isNullOrUndefined} from "util";


@Injectable()
export class UtilityService {

  constructor() {
  }

  public getUrl(url: string, filter: Object): string {
    if (!isNullOrUndefined(filter)) {
      return `${url}?filter=${encodeURI(JSON.stringify(filter))}`;
    } else {
      return url;
    }
  }


  public buildGenreQuery(genres: Array<string>) {
    let ref =
      {
        "where": {
          "and": [
          ]
        },
        "order": "created DESC"
      };
  }

  public buildDateQuery(start_day: number, end_day: number, size: number): any {
    let start = new Date();
    let end = new Date();
    start.setDate(start.getDate() - start_day);
    end.setDate(end.getDate() - end_day);
    start.toISOString();
    end.toISOString();

    return {
      "where": {
        "and": [
          {"created": {"gt": end}},
          {"created": {"lt": start}}
        ]
      },
      "order": ["rank DESC"],
      "limit": size
    };
  }

}
