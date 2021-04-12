import { HttpHeaders } from '@angular/common/http';

// /**
//  * https://angular.io/guide/http
//  * http://brianflove.com/2017/07/21/migrating-to-http-client/
//  **/
export interface HttpConfigurationParameters {
  apiKeys?: { [key: string]: string };
  username?: () => string;
  password?: string;
  accessToken?: () => string;
  basePath?: () => string;
  defaultHeaders?: { [name: string]: string | string[]; }; // Map<string, string[]>;
  withCredentials?: boolean;
}

export class HttpConfiguration {
  apiKeys?: { [key: string]: string };
  username?: () => string;
  password?: string;
  accessToken?: () => string;
  basePath?: () => string;
  defaultHeaders?: HttpHeaders;
  withCredentials?: boolean;

  constructor(configurationParameters: HttpConfigurationParameters = {}) {
    this.apiKeys = configurationParameters.apiKeys;
    this.username = configurationParameters.username;
    this.password = configurationParameters.password;
    this.accessToken = configurationParameters.accessToken;
    this.basePath = configurationParameters.basePath;
    this.defaultHeaders = new HttpHeaders(configurationParameters.defaultHeaders);
    this.withCredentials = configurationParameters.withCredentials;
  }

  // /**
  //  * Select the correct content-type to use for a request.
  //  * Uses {@link Configuration#isJsonMime} to determine the correct content-type.
  //  * If no content type is found return the first found type if the contentTypes is not empty
  //  * @param {string[]} contentTypes - the array of content types that are available for selection
  //  * @returns {string} the selected content-type or <code>undefined</code> if no selection could be made.
  //  */
  public selectHeaderContentType(contentTypes: string[]): string | undefined {
    if (contentTypes.length === 0) {
      return undefined;
    }

    const type = contentTypes.find(x => this.isJsonMime(x));
    if (type === undefined) {
      return contentTypes[0];
    }
    return type;
  }

  // /**
  //  * Select the correct accept content-type to use for a request.
  //  * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
  //  * If no content type is found return the first found type if the contentTypes is not empty
  //  * @param {string[]} accepts - the array of content types that are available for selection.
  //  * @returns {string} the selected content-type or <code>undefined</code> if no selection could be made.
  //  */
  public selectHeaderAccept(accepts: string[]): string | undefined {
    if (accepts.length === 0) {
      return undefined;
    }

    const type = accepts.find(x => this.isJsonMime(x));
    if (type === undefined) {
      return accepts[0];
    }
    return type;
  }

  // /**
  //  * Check if the given MIME is a JSON MIME.
  //  * JSON MIME examples:
  //  *   application/json
  //  *   application/json; charset=UTF8
  //  *   APPLICATION/JSON
  //  *   application/vnd.company+json
  // //  * @param {string} mime - MIME (Multipurpose Internet Mail Extensions)
  // //  * @return {boolean} True if the given MIME is JSON, false otherwise.
  //  */
  public isJsonMime(mime: string): boolean {
    const jsonMime: RegExp = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
    return mime != null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
  }

  // /**
  //  * @param {HttpHeaders} httpHeaders
  //  * @return {Headers}
  //  **/
  public toHeaders(httpHeaders: HttpHeaders): Headers {
    const headers: Headers = new Headers();
    if (httpHeaders === null || httpHeaders === undefined) {
      return headers;
    }
    httpHeaders.keys().forEach((key: string) => {
      if (key === null || key === undefined) { return true; }
      headers.set(key, httpHeaders.get(key)!);
      return headers;
    });

    return headers;
  }
}
