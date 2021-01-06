import { Injectable } from "@angular/core";
import { HttpClient  } from "@angular/common/http";
import { shortUrl } from './model/shortUrl';
import { environment } from "../environments/environment";
import { Observable } from "rxjs";



const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})

export class RestApiService {
  baseUrl = BACKEND_URL;
  http: any;
  constructor(private httpClient: HttpClient) {}

  getAll(): Promise<shortUrl[]> {
    return this.httpClient.get<shortUrl[]>(`${this.baseUrl}`).toPromise();
  }

  getOne(id): Promise<shortUrl> {
    return this.httpClient.get<shortUrl>(`${this.baseUrl}${id}/stats`).toPromise();
  }

  postOneUrl(formValues): Promise<shortUrl> {
    return this.httpClient.post<shortUrl>(`${this.baseUrl}short`, formValues).toPromise();
  }
  deleteUrl(id): Promise<shortUrl> {
    return this.httpClient.delete<shortUrl>(`${this.baseUrl}delete/${id}`).toPromise();
  }

  postShortClicks(short): Promise<shortUrl> {
    return this.httpClient.get<shortUrl>(`${this.baseUrl}short/${short}`).toPromise();
  }

  postUrlAndShort(formValues): Promise<shortUrl> {
    return this.httpClient.post<shortUrl>(`${this.baseUrl}customUrlShort`, formValues).toPromise();
  }
  getLinkPreview(link: string): Promise<any> {
    // to get access for the challenge I keep the ApiClient visible;
    const api = 'https://api.linkpreview.net/?key=9f867d39ba8d3eea376f1366d34fb71c&q=';

    return this.httpClient.get<any>(api + link).toPromise();

  }
}
