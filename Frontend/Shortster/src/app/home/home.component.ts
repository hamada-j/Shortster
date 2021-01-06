import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { RestApiService } from '../api.service';
import { shortUrl } from '../model/shortUrl';
import { Observable, observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeComponent  implements OnInit {
  connect = false;
  msgError = false;
  resError: String;
  response: String;
  dataSource: shortUrl[];
  data: unknown;
  shortForm: FormGroup;
  customForm: FormGroup;



  columnsToDisplay = ['full', 'short', 'clicks', 'created', 'lastVisit'];
  expandedElement: shortUrlElement | null;

  constructor(private restFullApi: RestApiService, private router: Router) {
    this.response = "";
    this.resError= "";

    this.shortForm = new FormGroup({
      url: new FormControl('', [
         Validators.required,
        Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
      ])
    });
     this.customForm = new FormGroup({
      url: new FormControl('', [
         Validators.required,
        Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
      ]),
      short: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  resetResponse(){
    setTimeout(async () => {
          this.response = ""
        }, 3000);
  }


  async onSubmit() {

    if (this.shortForm.valid) {
      await this.restFullApi.postOneUrl(this.shortForm.value).then(async res => {
        console.log(res);
        this.response = "Success to add!"
        this.shortForm.reset();
        this.ngOnInit();
      }).catch(err => {
        this.resError = err.error.message
        console.log(err)});
     } else {
       this.msgError = true;
     }
     this.resetResponse()
  }
  async onSubmitCustom(){

    if (this.customForm.valid) {
      await this.restFullApi.postUrlAndShort(this.customForm.value).then( res => {
        this.response = "Success to add!"
        this.customForm.reset();
        this.ngOnInit();
      }).catch(err => {
        this.resError = err.error.message
        console.log(err)
      });
     } else {
       this.msgError = true;
     }
     this.resetResponse()
  }

  handleRedirectToStart(id) {
    console.log(id)
    this.router.navigate([`${id}/stats`]);
  }

  async handleDelete(id) {
    await this.restFullApi.deleteUrl(id).then(async res => {
      this.ngOnInit();
    });
  }

  async handleOpen(short){
    await this.restFullApi.postShortClicks(short).then(async res => {
      window.open(res["data"], '_blank');
      this.ngOnInit();
    });
  }

  handleCopy(shortId){
  navigator.clipboard.writeText(shortId).then().catch(e => console.error(e));
  }

  handleCopyURL(full){
  navigator.clipboard.writeText(full).then().catch(e => console.error(e));
  }

   async ngOnInit() {
    this.data = await this.restFullApi.getAll();
    this.dataSource = this.data['data'];
    setTimeout(async () => {
      if(this.data)
      this.connect = true;
     }, 2000);
   }
}

export interface shortUrlElement {
  full: string;
  short: string;
  clicks: number;
  created: Date;
  lastVisit: Date;
}

