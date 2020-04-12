import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any, filter?: any): any {

    if (!items || !filter) {
      return items;
    }
    return items.filter(item => item.shopName.toString()
    .toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1);
  }

}
