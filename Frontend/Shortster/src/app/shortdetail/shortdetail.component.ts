import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../api.service';
import { shortUrl } from '../model/shortUrl';

@Component({
  selector: 'app-shortdetail',
  templateUrl: './shortdetail.component.html',
  styleUrls: ['./shortdetail.component.sass']
})
export class ShortdetailComponent implements OnInit {
  id: string;
  msgError: string;
  element: shortUrl;
  connect: boolean = false;
  preview: IlinkPreview;

  constructor(private router: Router, private route: ActivatedRoute, private restFullApi: RestApiService) { }

  async handleOpen(short){
    await this.restFullApi.postShortClicks(short).then(async res => {
      window.open(res["data"], '_blank');
      this.ngOnInit();
    });
  }



  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    await this.restFullApi.getOne(this.id).then(res => {
      this.element = res["data"];
    }).catch(err => this.msgError = "Try reload the page, thais's the error: " + err.message);
    this.connect = true;

    await this.restFullApi.getLinkPreview(this.element.full).then((res) => {
      console.log(res)

      this.preview = res;

    }).catch(err=>{
      this.msgError = "Try reload the page, thais's the error: " + err.message
    })
  }

}
export interface IlinkPreview {
    description: string;
    image: string;
    title: string;
    url: string;
  }
