import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToTime'
})
export class MsToTimePipe implements PipeTransform {

  transform(value: number = 0): string {
    value = Math.floor(value/1000);
    var secs = value % 60;
    value = (value - secs) / 60;
    var mins = value % 60;
    var hrs = (value - mins) / 60;
  
    return this.pad(hrs) + ':' + this.pad(mins) + ':' + this.pad(secs);
  }

  pad(n: number) {
    return ('00' + n).slice(-2);
  }

}
