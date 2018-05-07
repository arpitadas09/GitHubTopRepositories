import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import {FormsModule} from '@angular/forms';
import {GithubtopreposComponent} from "./components/githubtoprepos.component";
import {BsDatepickerModule, ButtonsModule, ModalModule} from "ngx-bootstrap";
import {OnlyNumberDirective} from "./directive/githubtoprepos.directive";

@NgModule({
  imports:      [ BrowserModule,HttpModule,FormsModule,ModalModule.forRoot(), ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot() ],
  declarations: [ AppComponent, GithubtopreposComponent,OnlyNumberDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
