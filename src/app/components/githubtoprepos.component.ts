import { Component, TemplateRef } from '@angular/core';
import { GithubtopreposService} from "../service/githubtoprepos.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap";


@Component({
  moduleId: module.id,
  selector: 'githubtoprepos',
  templateUrl: `githubtoprepos.component.html`,
  providers: [GithubtopreposService]

})
export class GithubtopreposComponent {
  toprepos:any;
  filterString:string;
  sortBy: string = "stars";
  orderBy: string = "desc";
  modalRefMoreFilter: BsModalRef;
  modalRefNewRepo: BsModalRef;
  modalRefDeleteConf: BsModalRef;
  moreFilters: Array<any> = [];
  repoModel: any;
  filters: Array<any> = [
    {value: 'created', name: "Created"},
    {value: 'fork', name: "Fork"},
    {value: 'forks', name: "# of Forks"},
    {value: 'in', name: "Search in"},
    {value: 'language', name: "Languages"},
    {value: 'license', name: "License"},
    {value: 'size', name: "Size"},
    {value: 'stars', name: "Stars"},
    {value: 'archived', name: "Archived"},
    {value: 'user', name: "User"},
    {value:'topic', name:"Topic"}
  ];

  constructor(private githubtopreposService: GithubtopreposService, private modalService: BsModalService){
    }

  search(){
    if(this.filterString == null || this.filterString == "")
      return;

    // Build final filter with more filter added
    let finalFilters = this.githubtopreposService.buildFilter(this.filterString,this.moreFilters);

    //Call Github API with filter-q, sort, order
    this.githubtopreposService.getTopTrendRepos(finalFilters,this.sortBy,this.orderBy).subscribe(toprepos => {
      this.toprepos =  toprepos;
      console.log(this.toprepos);
    });
  }

  openFilterModal(template: TemplateRef<any>) {
    this.modalRefMoreFilter = this.modalService.show(template);
  }

  addFilter(){
    this.moreFilters.push({filterName: '' , filterValue: ''});
  }

  moreFilterSearch(){
    this.search();
    this.modalRefMoreFilter.hide();
  }

  deleteFilter(idx: number){
    this.moreFilters.splice(idx,1);
  }

  openRepoModal(template: TemplateRef<any>,data:any) {
    if(data == null){
      data = {};
    }
    this.repoModel = data;
    this.modalRefNewRepo = this.modalService.show(template);
  }
  closeRepoModal(){
    this.repoModel = {};
    this.modalRefNewRepo.hide();
  }

  openDeleteConf(template: TemplateRef<any>) {
    this.modalRefDeleteConf = this.modalService.show(template);
  }
}
