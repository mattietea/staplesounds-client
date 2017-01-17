import {Pipe, PipeTransform} from '@angular/core';
import {isNullOrUndefined} from "util";

@Pipe({name: 'keys'})

export class KeyPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    for (let key in value) {
      let val = {key: key, value: value[key]};
      if (!isNullOrUndefined(val.value)) {
        keys.push(val);
      }
    }
    return keys;
  }
}
