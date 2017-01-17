import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
   transform(value: number){
    let minutes = Math.floor(value / 60);
    let seconds = Math.floor(value - minutes * 60);
    let minStr = minutes > 9 ? minutes.toString() : '0' + minutes.toString();
    let secStr = seconds > 9 ? seconds.toString() : '0' + seconds.toString();
    return minStr + ':' + secStr;
  }
}