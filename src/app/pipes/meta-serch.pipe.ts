import { Pipe, PipeTransform } from '@angular/core';
import { MetaModel } from 'app/models/EntityModels/Meta/MetaModel';

@Pipe({
  name: 'metaSerch'
})
export class MetaSerchPipe implements PipeTransform {

  transform(value: MetaModel[], filterText:string): MetaModel[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";
    
    return  filterText?value.filter((c:MetaModel)=>
    c.page.name.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
