import { Injectable } from "@angular/core";
import { HttpClient  } from "@angular/common/http";
import { shortUrl } from './model/shortUrl';
import { environment } from "../environments/environment";



const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})

export class RestApiService {
  baseUrl = BACKEND_URL;
  constructor(private httpClient: HttpClient) {}

  getAll(): Promise<shortUrl[]> {
    return this.httpClient.get<shortUrl[]>(`${this.baseUrl}`).toPromise();
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
}
