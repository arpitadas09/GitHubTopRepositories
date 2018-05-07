import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from "@angular/http";

@Injectable()
  export class GithubtopreposService {
  client_id: any = 'ed621dc6783c3764b35b';
  client_secret: any = '625ac570eda10ee8c692b613027e01c050c07ba6';
  constructor(private  _http: Http) {
    console.log('Github service init');
  }

  getTopTrendRepos(filterValue: string, sortBy: string , orderBy : string) {
    let client_info = 'client_id=' + this.client_id + '&client_secret=' + this.client_secret;
    let filter =  'q='+ filterValue +'&sort='+sortBy + '&order='+orderBy+ '&per_page=10';
    let urlParams = 'https://api.github.com/search/repositories?' + client_info + '&' + filter;

    console.log(urlParams);
    return this._http.get(urlParams)
      .map(res => res.json());
  }

  buildFilter(defaultFilter: string, moreFilters: Array<any>){
    let filterValue = defaultFilter;
    for(let i=0; i< moreFilters.length ; i++){
      if( moreFilters[i].filterName != '' && moreFilters[i].filterValue != ''){
        filterValue =  filterValue + '+' + moreFilters[i].filterName+':';
        filterValue = filterValue+ moreFilters[i].filterValue;
      }
    };
    return filterValue;
  }
}
