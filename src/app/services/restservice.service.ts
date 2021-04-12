import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient, HttpResponse } from '@angular/common/http';
import { HttpConfiguration } from '../http.configuration';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestserviceService {

  public configuration!: HttpConfiguration;

  constructor(public httpClient: HttpClient) {
    this.configuration = new HttpConfiguration({
      basePath!: () => 'http://localhost:8080',
      apiKeys: {},
      defaultHeaders: {
        'Content-Type': 'application/json' + '; charset=utf-8',
        Accept: 'text/plain',
      },
      withCredentials: true
    });
  }

  /**
   * Gets PagingResp response
   * @param request The ProgramPagingReq JSON you want to post.
   */
  public createLobby(lobbyID: string): Observable<string> {
    // if (user === null || user === undefined) {
    //   throw new Error('Required parameter request was null or undefined when calling getProgramPage.');
    // }

    const headers = this.configuration.defaultHeaders;
    // authentication (JsonWebToken) required

    const path = this.configuration.basePath() + '/createLobby';

    return this.httpClient.post<string>(path, lobbyID,
      {
        responseType: 'text' as 'json',
        withCredentials: this.configuration.withCredentials,
        headers,
        observe: 'response',
        reportProgress: false,
      }
    ).pipe(map((response: any) => {
      return (response.status === 204) ? undefined : response.body;
    }));
  }
}
