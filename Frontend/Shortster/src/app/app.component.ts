import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { RestApiService } from './api.service';
import { shortUrl } from './model/shortUrl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent  implements OnInit {
  title = 'Shortster';
  connect = false;
  dataSource: shortUrl[];
  data: unknown;
  shortForm: FormGroup;
  customForm: FormGroup;




  columnsToDisplay = ['full', 'short', 'clicks', 'created', 'lastVisit'];
  expandedElement: shortUrlElement | null;

  constructor(private restFullApi: RestApiService, ) {

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


  onSubmit() {
    if (this.shortForm.valid) {
      this.restFullApi.postOneUrl(this.shortForm.value).then(async res => {
        console.log(res);
        this.shortForm.reset();
        this.ngOnInit();
      }).catch(err => console.log(err));
     }
  }
  onSubmitCustom(){

    if (this.customForm.valid) {
      this.restFullApi.postUrlAndShort(this.customForm.value).then( res => {
        this.customForm.reset();
        this.ngOnInit();
      }).catch(err => console.log(err));
     }
  }
  handleDelete(id) {
    this.restFullApi.deleteUrl(id).then(async res => {
      this.ngOnInit();
    });
  }
  handleRedirect(e){
    console.log(e)
  }
  handleOpen(short){
    this.restFullApi.postShortClicks(short).then(async res => {
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
     }, 3000);
   }


}

export interface shortUrlElement {
  full: string;
  short: string;
  clicks: number;
  created: Date;
  lastVisit: Date;
}

