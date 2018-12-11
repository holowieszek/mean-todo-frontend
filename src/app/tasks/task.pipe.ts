import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'task'
})
export class TaskPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }

    return value.filter(item => {
      return item['title'].toLowerCase().includes(args.toLowerCase());
    });
  }

}
